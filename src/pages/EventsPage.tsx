import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PublicEvent {
  id: string;
  title: string;
  type: 'Workshop' | 'Info Session';
  date: string;
}

const EventsPage = () => {
    const [events, setEvents] = useState<PublicEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "publicEvents"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PublicEvent))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEvents(fetchedEvents);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
         <div className="min-h-screen bg-background text-foreground pt-28 pb-16">
            <div className="container mx-auto px-6">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">Upcoming Events</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        Join our workshops, info sessions, and stay updated on important deadlines.
                    </p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? <p className="col-span-full text-center">Loading events...</p> : events.length > 0 ? events.map((event, index) => (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 flex flex-col"
                        >
                            <div className="mb-4">
                              <span className="text-sm font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full">{event.type || 'Event'}</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-foreground flex-grow">{event.title}</h3>
                            <div className="text-muted-foreground text-sm space-y-2 mt-4">
                                <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
                                <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6:00 PM onwards</p>
                            </div>
                            <Button className="mt-6 w-full neumorphic-button">Register Now</Button>
                        </motion.div>
                    )) : <p className="col-span-full text-center text-muted-foreground py-10">No upcoming public events. Please check back soon!</p>}
                </div>
            </div>
         </div>
    );
};

export default EventsPage;