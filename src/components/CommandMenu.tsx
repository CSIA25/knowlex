import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Home,
  Briefcase,
  Users,
  FileText,
  Phone,
  Sparkles,
} from 'lucide-react';

// Navigation links
const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Student Services', path: '/services', icon: Users },
  { name: 'Educator Services', path: '/services/teachers', icon: Briefcase },
  { name: 'Institutional Services', path: '/services/institutions', icon: FileText },
  { name: 'Media Hub', path: '/media', icon: Sparkles },
  { name: 'Contact Us', path: '/contact', icon: Phone },
];

// Updated types
export function CommandMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen); // ✅ Correct usage
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navLinks.map((link) => (
            <CommandItem
              key={link.path}
              onSelect={() => runCommand(() => navigate(link.path))}
            >
              <link.icon className="mr-2 h-4 w-4" />
              <span>{link.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
