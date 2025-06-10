import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Check, CheckCircle, Circle, Clock, Plus, BarChart, Send, ListTodo, Target, Folder, Calendar } from "lucide-react";
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import SupportChat from "@/components/SupportChat";

// --- TYPES ---
type ApplicationStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Interviewing' | 'Accepted' | 'Rejected';
interface Application {
    id: string;
    university: string;
    program: string;
    status: ApplicationStatus;
    dueDate: string;
}
interface Task {
    id: string;
    text: string;
    completed: boolean;
}
interface Document {
    id: string;
    text: string;
    uploaded: boolean;
}
interface GlobalEvent {
    id: string;
    title: string;
    type: 'Deadline' | 'Workshop' | 'Info Session';
    date: string;
}


// --- STYLES & CONFIGS ---
const statusStyles: Record<ApplicationStatus, string> = {
    'Not Started': 'border-gray-400/30 bg-gray-400/10 text-gray-400',
    'In Progress': 'border-blue-400/30 bg-blue-400/10 text-blue-400',
    'Submitted': 'border-purple-400/30 bg-purple-400/10 text-purple-400',
    'Interviewing': 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400',
    'Accepted': 'border-green-400/30 bg-green-400/10 text-green-400',
    'Rejected': 'border-red-400/30 bg-red-400/10 text-red-400',
};
const chartColors = ['#9CA3AF', '#60A5FA', '#A78BFA', '#FBBF24', '#4ADE80', '#F87171'];
const chartStatusOrder: ApplicationStatus[] = ['Not Started', 'In Progress', 'Submitted', 'Interviewing', 'Accepted', 'Rejected'];


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};


const Dashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [docs, setDocs] = useState<Document[]>([]);
    const [globalEvents, setGlobalEvents] = useState<GlobalEvent[]>([]);
    const [isAddAppOpen, setAddAppOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    
    // --- DATA FETCHING & MANAGEMENT ---
    useEffect(() => {
        if (!user) return;
        const collections: { [key: string]: React.Dispatch<React.SetStateAction<any[]>> } = {
            applications: setApplications,
            tasks: setTasks,
            documents: setDocs
        };
        const unsubscribes = Object.entries(collections).map(([colName, setter]) => {
            const q = query(collection(db, colName), where("userId", "==", user.uid));
            return onSnapshot(q, (snapshot) => {
                const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setter(items as any);
            });
        });

        const qEvents = query(collection(db, "globalEvents"));
        const unsubEvents = onSnapshot(qEvents, (snapshot) => {
            const events: GlobalEvent[] = [];
            snapshot.forEach((doc) => {
                events.push({ id: doc.id, ...doc.data() } as GlobalEvent);
            });
            setGlobalEvents(events);
        });

        return () => {
          unsubscribes.forEach(unsub => unsub());
          unsubEvents();
        };
    }, [user]);

    // Add new application
    const onAddApplication = async (data: any) => {
        if (!user) return;
        await addDoc(collection(db, "applications"), { ...data, status: 'Not Started', userId: user.uid });
        reset(); setAddAppOpen(false);
    };

    // Toggle completion status
    const toggleCompletion = async (id: string, colName: 'tasks' | 'documents', currentStatus: boolean) => {
        await updateDoc(doc(db, colName, id), { [colName === 'tasks' ? 'completed' : 'uploaded']: !currentStatus });
    };

    // --- MEMOIZED CALCULATIONS FOR PERFORMANCE ---
    const taskProgress = useMemo(() => tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0, [tasks]);
    const chartData = useMemo(() => {
        const statusCounts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {} as Record<ApplicationStatus, number>);
        return chartStatusOrder.map(status => ({ name: status, value: statusCounts[status] || 0 })).filter(item => item.value > 0);
    }, [applications]);
    
    const upcomingEvents = useMemo(() => {
        const personalDeadlines = applications
            .map(app => ({
                id: app.id,
                title: `${app.university} - ${app.program}`,
                description: 'Application Deadline',
                date: app.dueDate,
                type: 'personal' as const
            }));
        
        const allGlobalEvents = globalEvents.map(event => ({
            id: event.id,
            title: event.title,
            description: event.type,
            date: event.date,
            type: 'global' as const
        }));

        const combined = [...personalDeadlines, ...allGlobalEvents];
        
        return combined
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    }, [applications, globalEvents]);

    return (
        <div className="min-h-screen animated-gradient-background text-foreground pt-28 pb-16">
            <div className="container mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <h1 className="text-5xl font-light text-glow">Mission Control</h1>
                    <p className="text-xl text-primary mt-2">Welcome, {user?.email?.split('@')[0] || 'Explorer'}</p>
                </motion.div>
                
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-8">
                        <motion.div variants={itemVariants} className="glass-card p-6">
                            <h2 className="text-2xl font-medium mb-4 flex items-center gap-2"><BarChart className="text-accent" />Application Status</h2>
                            {applications.length > 0 ? (
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={chartData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" nameKey="name">
                                                {chartData.map((_entry, index) => <Cell key={`cell-${index}`} fill={chartColors[chartStatusOrder.indexOf(_entry.name as ApplicationStatus) % chartColors.length]} className="focus:outline-none ring-0"/>)}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                            <Legend iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : <p className="text-muted-foreground text-center py-12">Add an application to see stats.</p>}
                        </motion.div>

                         <motion.div variants={itemVariants} className="glass-card p-6">
                             <h2 className="text-2xl font-medium mb-4 flex items-center gap-2"><ListTodo className="text-accent" />Task Checklist</h2>
                             <div className="space-y-4">
                                <Progress value={taskProgress} className="h-2" />
                                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                     <AnimatePresence>
                                        {tasks.sort((a,b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1).map(task => (
                                            <motion.div layout key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => toggleCompletion(task.id, 'tasks', task.completed)}
                                                className="flex items-center gap-3 cursor-pointer group">
                                                {task.completed ? <CheckCircle className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary" />}
                                                <span className={task.completed ? "text-muted-foreground line-through" : "group-hover:text-primary"}>{task.text}</span>
                                            </motion.div>
                                        ))}
                                     </AnimatePresence>
                                </div>
                             </div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {user && <SupportChat targetUserId={user.uid} isAdminView={false} />}
                        <motion.div variants={itemVariants} className="glass-card p-6">
                             <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-medium flex items-center gap-2"><Send className="text-accent"/>Mission Log</h2>
                                 <Dialog open={isAddAppOpen} onOpenChange={setAddAppOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="neumorphic-button"><Plus className="w-4 h-4 mr-2" /> Add Application</Button>
                                    </DialogTrigger>
                                    <DialogContent className="glass-card">
                                        <DialogHeader>
                                            <DialogTitle className="text-glow text-2xl">New Application</DialogTitle>
                                            <DialogDescription className="text-muted-foreground">
                                                Add a new university application to your mission log to start tracking.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit(onAddApplication)} className="space-y-4 pt-4">
                                            <Input {...register("university")} placeholder="University Name" className="bg-input h-11" required />
                                            <Input {...register("program")} placeholder="Program/Course" className="bg-input h-11" required />
                                            <Input {...register("dueDate")} type="date" className="bg-input h-11" required />
                                            <Button type="submit" className="w-full h-11">Add to Log</Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                                <AnimatePresence>
                                {applications.length > 0 ? (
                                    applications.map(app => (
                                        <motion.div layout key={app.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="bg-muted/30 p-4 rounded-lg flex justify-between items-center border border-transparent hover:border-primary/50 transition-colors">
                                            <div>
                                                <p className="font-semibold text-lg">{app.university}</p>
                                                <p className="text-sm text-muted-foreground">{app.program}</p>
                                                <p className="text-xs text-muted-foreground/80 mt-1 flex items-center gap-1"><Clock className="w-3 h-3"/>Due: {new Date(app.dueDate).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyles[app.status]}`}>
                                                {app.status}
                                            </span>
                                        </motion.div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-10">Your mission log is empty. Add an application to get started!</p>
                                )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass-card p-6">
                           <h2 className="text-2xl font-medium mb-4 flex items-center gap-2"><Folder className="text-accent"/>Document Hub</h2>
                           <div className="space-y-3">
                                {docs.map(docItem => (
                                    <div key={docItem.id} className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                                        <p className={docItem.uploaded ? "text-muted-foreground line-through" : ""}>{docItem.text}</p>
                                        <Button size="sm" variant={docItem.uploaded ? "secondary" : "outline"} onClick={() => toggleCompletion(docItem.id, 'documents', docItem.uploaded)}>
                                            {docItem.uploaded ? 'Uploaded' : 'Upload'}
                                        </Button>
                                    </div>
                                ))}
                           </div>
                        </motion.div>
                        
                         <motion.div variants={itemVariants} className="glass-card p-6">
                           <h2 className="text-2xl font-medium mb-4 flex items-center gap-2"><Calendar className="text-accent"/>Upcoming Deadlines & Meetings</h2>
                           <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.slice(0, 5).map(event => (
                                    <div key={event.id + event.title} className={`flex items-center gap-4 bg-muted/30 p-3 rounded-lg border-l-4 ${event.type === 'global' ? 'border-accent' : 'border-primary'}`}>
                                        <div className="text-center w-12 flex-shrink-0">
                                            <p className={`text-sm font-bold ${event.type === 'global' ? 'text-accent' : 'text-primary'}`}>{new Date(event.date).toLocaleString('default', { month: 'short' })}</p>
                                            <p className="text-2xl font-bold">{new Date(event.date).getDate()}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{event.title}</p>
                                            <p className="text-xs text-muted-foreground">{event.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center py-4">No upcoming events or deadlines.</p>
                            )}
                           </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;