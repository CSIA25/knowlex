import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare, UserCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: any;
  senderName?: string;
}

// The props interface that was missing from the component definition
interface SupportChatProps {
    targetUserId: string; 
    isAdminView: boolean;
}

// The component now correctly accepts props
const SupportChat = ({ targetUserId, isAdminView }: SupportChatProps) => {
    const { user } = useAuth(); // This is the currently logged-in user (could be admin or user)
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (!targetUserId) return;
        const q = query(collection(db, `conversations/${targetUserId}/messages`), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [targetUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || newMessage.trim() === '') return;
        
        // Use the logged-in user's ID as the senderId
        await addDoc(collection(db, `conversations/${targetUserId}/messages`), {
            text: newMessage,
            senderId: user.uid, 
            senderName: isAdminView ? 'Support Team' : user.email?.split('@')[0],
            createdAt: serverTimestamp()
        });
        setNewMessage('');
    };

    return (
        <motion.div 
            initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
            className="glass-card p-6 flex flex-col h-full"
        >
            <h2 className="text-2xl font-medium mb-4 flex items-center gap-2">
                <MessageSquare className="text-accent"/>
                {isAdminView ? 'Conversation' : 'Support Chat'}
            </h2>
            <div className="flex-grow bg-muted/30 rounded-lg p-4 space-y-4 overflow-y-auto h-96">
                <AnimatePresence>
                    {messages.map(msg => {
                        // The logic here remains the same: is the message sender the currently logged-in user?
                        const isSentByCurrentUser = msg.senderId === user?.uid;
                        return (
                        <motion.div
                            key={msg.id}
                            layout
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn("flex items-end gap-2", isSentByCurrentUser ? 'justify-end' : 'justify-start')}
                        >
                            {!isSentByCurrentUser && <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"><ShieldCheck className="w-5 h-5 text-primary" /></div>}
                            <div className={cn(
                                "max-w-xs md:max-w-md p-3 rounded-2xl",
                                isSentByCurrentUser 
                                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                                    : 'bg-muted rounded-bl-none'
                            )}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                           {isSentByCurrentUser && <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0"><UserCircle className="w-5 h-5 text-secondary" /></div>}
                        </motion.div>
                    )})}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <Input 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type your message..."
                    className="bg-input"
                />
                <Button type="submit" className="neumorphic-button flex-shrink-0">
                    <Send className="w-5 h-5"/>
                </Button>
            </form>
        </motion.div>
    );
};

export default SupportChat;