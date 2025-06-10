import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, Camera, Newspaper } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';


interface MediaItem {
  id: number;
  category: 'Blog' | 'Gallery' | 'News';
  title: string;
  slug: string;
  image: string;
  size: string;
  description: string;
}

const allMediaItems: MediaItem[] = [
  { id: 1, category: 'Blog', title: '12 Strategies for an Unforgettable Essay', slug: '#', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=800&auto=format&fit=crop', size: 'col-span-1 md:col-span-2', description: "Your essay is your unique opportunity to stand out. Discover our proven strategies, from crafting a compelling narrative to avoiding common pitfalls, ensuring your voice is heard by admissions officers." },
  { id: 2, category: 'Gallery', title: 'Campus Visit: Oxford University', slug: '#', image: 'https://plus.unsplash.com/premium_photo-1683887034552-4635692bb57c?w=500&auto=format&fit=crop', size: 'col-span-1', description: "Journey with us through the historic halls and stunning architecture of Oxford. See the inspiring environment that awaits future scholars." },
  { id: 3, category: 'News', title: 'Knowlex Featured in Forbes', slug: '#', image: 'https://images.unsplash.com/photo-1610902422826-548d3472fff5?w=500&auto=format&fit=crop', size: 'col-span-1', description: "We are honored to be featured in Forbes for our innovative approach to global education and our impact on creating opportunities for students worldwide." },
  { id: 4, category: 'Blog', title: 'Navigating the UK Visa Process', slug: '#', image: 'https://images.unsplash.com/photo-1654452530992-43c5a7c5ab37?w=500&auto=format&fit=crop', size: 'col-span-1', description: "The visa application can be a daunting process. Our guide breaks it down into simple, manageable steps to ensure you're prepared and confident." },
  { id: 5, category: 'Gallery', title: 'Our 2024 Scholarship Winners', slug: '#', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop', size: 'col-span-1 md:col-span-2', description: "Meet the bright minds who have secured life-changing scholarships through Knowlex this year. Their stories of dedication and success are an inspiration to us all." },
  { id: 6, category: 'News', title: 'New Partnership with Canadian Universities', slug: '#', image: 'https://images.unsplash.com/photo-1578973615934-8d9cdb0792b4?w=500&auto=format&fit=crop', size: 'col-span-1', description: "We're excited to announce new partnerships with leading Canadian universities, opening up more pathways for our students to study in the Great White North." },
];

const filters = [
    { name: 'All', value: 'All' },
    { name: 'Blog Posts', value: 'Blog', icon: BookOpen },
    { name: 'News & Updates', value: 'News', icon: Newspaper },
    { name: 'Galleries', value: 'Gallery', icon: Camera },
];

const MediaPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    const filteredItems = activeFilter === 'All'
        ? allMediaItems
        : allMediaItems.filter(item => item.category === activeFilter);

    return (
        <div className="bg-background min-h-screen pt-28 pb-16">
            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="glass-card max-w-3xl p-0 border-0">
                  {selectedItem && (
                    <div className="flex flex-col">
                        <div className="relative h-80 w-full">
                           <img src={selectedItem.image} alt={selectedItem.title} className="absolute inset-0 w-full h-full object-cover rounded-t-lg"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="p-8">
                            <DialogHeader>
                                <DialogTitle className="text-glow text-3xl mb-2">{selectedItem.title}</DialogTitle>
                                <DialogDescription className="text-muted-foreground text-base">
                                    {selectedItem.description}
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                    </div>
                  )}
                </DialogContent>
            </Dialog>

            <div className="container">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">Media Hub</h1>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Insights, stories, and updates from the world of global education.
                    </p>
                </div>
                
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {filters.map(filter => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={cn(
                                'px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 neumorphic-button',
                                activeFilter !== filter.value && 'bg-muted/50 hover:bg-muted'
                            )}
                        >
                            {filter.icon && <filter.icon className="w-5 h-5" />}
                            {filter.name}
                        </button>
                    ))}
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredItems.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className={item.size}
                            >
                               <button onClick={() => setSelectedItem(item)} className="group block w-full h-96 rounded-2xl overflow-hidden glass-card shadow-lg text-left">
                                    <div className="relative w-full h-full">
                                        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-6 text-white">
                                            <span className="text-xs font-bold uppercase tracking-widest bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">{item.category}</span>
                                            <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default MediaPage;