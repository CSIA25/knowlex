import { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBanner = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
      >
        <div className="container mx-auto px-6 py-2.5">
          <div className="flex items-center justify-between">
            <p className="flex items-center text-sm font-medium">
              <Megaphone className="w-5 h-5 mr-3" />
              <span className="hidden md:inline">Global Scholarship Events starting next week!</span>
              <span className="md:hidden">Upcoming Global Scholarship Events!</span>
            </p>
            <div className="flex items-center gap-4">
               <a href="/events" className="text-sm font-bold underline hover:opacity-80">
                View Events
              </a>
              <button onClick={() => setIsOpen(false)} aria-label="Dismiss">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;