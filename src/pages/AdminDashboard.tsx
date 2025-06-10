import { useState, useEffect } from "react";
import { collection, onSnapshot, query, doc, updateDoc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, Calendar, Plus, Trash2, Megaphone, ArrowLeft, MessageSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import SupportChat from "@/components/SupportChat";

// --- TYPES ---
type ApplicationStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Interviewing' | 'Accepted' | 'Rejected';
interface User { id: string; email: string; }
interface Application { id: string; university: string; program: string; status: ApplicationStatus; userId: string; userEmail?: string; }
interface GlobalEvent { id: string; title: string; type: 'Deadline' | 'Workshop' | 'Info Session'; date: string; }
interface PublicEvent extends GlobalEvent {} // They share the same structure for now

const statusOptions: ApplicationStatus[] = ['Not Started', 'In Progress', 'Submitted', 'Interviewing', 'Accepted', 'Rejected'];

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [globalEvents, setGlobalEvents] = useState<GlobalEvent[]>([]);
    const [publicEvents, setPublicEvents] = useState<PublicEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddUserEventOpen, setAddUserEventOpen] = useState(false);
    const [isAddPublicEventOpen, setAddPublicEventOpen] = useState(false);
    const [selectedUserChat, setSelectedUserChat] = useState<User | null>(null);
    
    // Separate form instances for each dialog
    const userEventForm = useForm();
    const publicEventForm = useForm();

    useEffect(() => {
        const unsubUsers = onSnapshot(query(collection(db, "users")), snap => setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as User))));
        const unsubApps = onSnapshot(query(collection(db, "applications")), snap => {
            setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() } as Application)));
            setLoading(false);
        });
        const unsubGlobalEvents = onSnapshot(query(collection(db, "globalEvents")), snap => setGlobalEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as GlobalEvent)).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
        const unsubPublicEvents = onSnapshot(query(collection(db, "publicEvents")), snap => setPublicEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as PublicEvent)).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
        
        return () => { unsubUsers(); unsubApps(); unsubGlobalEvents(); unsubPublicEvents(); };
    }, []);

    const applicationsWithEmails = applications.map(app => ({ ...app, userEmail: users.find(u => u.id === app.userId)?.email || 'Unknown' }));

    const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => await updateDoc(doc(db, "applications", appId), { status: newStatus });
    
    const onAddEvent = async (data: any, type: 'global' | 'public') => {
        const collectionName = type === 'global' ? 'globalEvents' : 'publicEvents';
        await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() });
        if (type === 'global') {
            userEventForm.reset();
            setAddUserEventOpen(false);
        } else {
            publicEventForm.reset();
            setAddPublicEventOpen(false);
        }
    };

    const onDeleteEvent = async (eventId: string, type: 'global' | 'public') => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            const collectionName = type === 'global' ? 'globalEvents' : 'publicEvents';
            await deleteDoc(doc(db, collectionName, eventId));
        }
    };
    
    if (selectedUserChat) {
        return (
             <div className="min-h-screen bg-muted/40 text-foreground pt-28 pb-16">
                <div className="container mx-auto px-6">
                    <Button onClick={() => setSelectedUserChat(null)} variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin Panel
                    </Button>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-center text-2xl font-bold mb-4">Chat with <span className="text-primary">{selectedUserChat.email}</span></h2>
                        <SupportChat targetUserId={selectedUserChat.id} isAdminView={true} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/40 text-foreground pt-28 pb-16">
            <div className="container mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-bold text-glow">Admin Control Panel</h1>
                    <p className="text-muted-foreground mt-2">Manage users and applications across the platform.</p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-background p-6 rounded-xl shadow-sm flex items-center gap-4">
                        <Users className="w-8 h-8 text-primary" />
                        <div>
                            <p className="text-muted-foreground text-sm">Total Users</p>
                            <p className="text-3xl font-bold">{users.length}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-xl shadow-sm flex items-center gap-4">
                        <FileText className="w-8 h-8 text-primary" />
                        <div>
                            <p className="text-muted-foreground text-sm">Total Applications</p>
                            <p className="text-3xl font-bold">{applications.length}</p>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-xl shadow-sm flex items-center gap-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                        <div>
                            <p className="text-muted-foreground text-sm">Accepted Applications</p>
                            <p className="text-3xl font-bold">{applications.filter(a => a.status === 'Accepted').length}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Event Management Section */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* MANAGE GLOBAL EVENTS (for user dashboards) */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-background p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold flex items-center gap-2"><Calendar className="w-6 h-6 text-accent"/> User Dashboard Events</h2>
                            <Dialog open={isAddUserEventOpen} onOpenChange={setAddUserEventOpen}>
                                <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add User Event</Button></DialogTrigger>
                                <DialogContent className="glass-card">
                                    <DialogHeader>
                                        <DialogTitle>Create User Dashboard Event</DialogTitle>
                                        <DialogDescription>This event will appear on all users' dashboards.</DialogDescription>
                                    </DialogHeader>
                                    <Form {...userEventForm}>
                                        <form onSubmit={userEventForm.handleSubmit(data => onAddEvent(data, 'global'))} className="space-y-4 pt-4">
                                            <Input {...userEventForm.register("title")} placeholder="Event Title (e.g., 'Meeting with Consultant')" required />
                                            <FormField
                                                control={userEventForm.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                                            <FormControl><SelectTrigger><SelectValue placeholder="Event Type" /></SelectTrigger></FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Deadline">Deadline</SelectItem>
                                                                <SelectItem value="Workshop">Workshop</SelectItem>
                                                                <SelectItem value="Info Session">Info Session</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                            <Input {...userEventForm.register("date")} type="date" required />
                                            <Button type="submit" className="w-full">Create Event</Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {globalEvents.length > 0 ? globalEvents.map(event => (
                                <div key={event.id} className="bg-muted/50 p-3 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => onDeleteEvent(event.id, 'global')}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            )) : <p className="text-muted-foreground text-center py-8">No global events for users scheduled.</p>}
                        </div>
                    </motion.div>

                    {/* MANAGE PUBLIC EVENTS (for /events page) */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-background p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold flex items-center gap-2"><Megaphone className="w-6 h-6 text-accent"/> Public Events Page</h2>
                            <Dialog open={isAddPublicEventOpen} onOpenChange={setAddPublicEventOpen}>
                                <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add Public Event</Button></DialogTrigger>
                                <DialogContent className="glass-card">
                                    <DialogHeader>
                                        <DialogTitle>Create Public Event</DialogTitle>
                                        <DialogDescription>This event will appear on the public /events page.</DialogDescription>
                                    </DialogHeader>
                                    <Form {...publicEventForm}>
                                        <form onSubmit={publicEventForm.handleSubmit(data => onAddEvent(data, 'public'))} className="space-y-4 pt-4">
                                            <Input {...publicEventForm.register("title")} placeholder="Event Title" required />
                                            <FormField
                                                control={publicEventForm.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                                            <FormControl><SelectTrigger><SelectValue placeholder="Event Type" /></SelectTrigger></FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Workshop">Workshop</SelectItem>
                                                                <SelectItem value="Info Session">Info Session</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                            <Input {...publicEventForm.register("date")} type="date" required />
                                            <Button type="submit" className="w-full">Create Event</Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                             {publicEvents.length > 0 ? publicEvents.map(event => (
                                <div key={event.id} className="bg-muted/50 p-3 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => onDeleteEvent(event.id, 'public')}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            )) : <p className="text-muted-foreground text-center py-8">No public events scheduled.</p>}
                        </div>
                    </motion.div>
                </div>
                
                {/* Application Management Table */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 bg-background p-6 rounded-xl shadow-sm"
                 >
                    <h2 className="text-2xl font-semibold mb-4">Application Management</h2>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>University</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead className="text-center w-[200px]">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center py-10">Loading applications...</TableCell></TableRow>
                                ) : applicationsWithEmails.length === 0 ? (
                                     <TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No applications found.</TableCell></TableRow>
                                ) : (
                                    applicationsWithEmails.map(app => (
                                        <TableRow key={app.id}>
                                            <TableCell>{app.userEmail}</TableCell>
                                            <TableCell className="font-medium">{app.university}</TableCell>
                                            <TableCell>{app.program}</TableCell>
                                            <TableCell>
                                                <Select value={app.status} onValueChange={(value) => handleStatusChange(app.id, value as ApplicationStatus)}>
                                                    <SelectTrigger className="w-[180px] mx-auto">
                                                        <SelectValue placeholder="Set status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statusOptions.map(status => (
                                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                 </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;