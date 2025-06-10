import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

const Navigation = ({ setOpenCommandMenu }: { setOpenCommandMenu: (open: boolean) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isSuperadmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = "text-muted-foreground hover:text-foreground transition-colors duration-300 font-light";

  return (
    <>
      <nav className={cn(
        "relative z-50 transition-all duration-300", // Changed from fixed to relative
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/20 py-3' 
          : 'bg-background/50 backdrop-blur-sm py-4' // Use a subtle background even when not scrolled
      )}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <i className="ph-globe text-white text-xl"></i>
              </div>
              <span className="text-2xl font-semibold text-glow">Knowlex</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={navLinkClass}>Home</Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={cn(navLinkClass, "flex items-center gap-1")}>
                    Services
                    <i className="ph-caret-down text-xs"></i>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate('/services')}>For Students</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/services/teachers')}>For Educators</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/services/institutions')}>For Institutions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/media" className={navLinkClass}>Media</Link>
              <Link to="/events" className={navLinkClass}>Events</Link> {/* <-- Add Events Link */}
              <Link to="/contact" className={navLinkClass}>Contact</Link>
            </div>

            {/* CTA / User Menu */}
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" onClick={() => setOpenCommandMenu(true)} className="text-muted-foreground hover:text-foreground">
                <Search className="h-5 w-5" />
              </Button>
              <div className="hidden md:block">
                {user ? (
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/80 text-primary-foreground">
                            {user?.email?.[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      {isSuperadmin ? (
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <i className="ph-user-gear mr-2"></i>
                          Admin Panel
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                          <i className="ph-layout mr-2"></i>
                          Dashboard
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                        <i className="ph-sign-out mr-2"></i>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button onClick={() => navigate('/login')} className="neumorphic-button">
                    Login / Sign Up
                  </Button>
                )}
              </div>
               {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg"
              >
                <i className={`ph-${isMobileMenuOpen ? 'x' : 'list'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-80 glass-card menu-enter p-8 pt-24 flex flex-col">
            <div className="space-y-6">
              <Link to="/" className="block w-full text-left text-lg font-light text-muted-foreground hover:text-foreground">Home</Link>
              <Link to="/services" className="block w-full text-left text-lg font-light text-muted-foreground hover:text-foreground">Student Services</Link>
              <Link to="/services/teachers" className="block w-full text-left text-lg font-light text-muted-foreground hover:text-foreground">Educator Services</Link>
              <Link to="/services/institutions" className="block w-full text-left text-lg font-light text-muted-foreground hover:text-foreground">Institutional Services</Link>
              <Link to="/media" className="block w-full text-left text-lg font-light text-muted-foreground hover:text-foreground">Media</Link>
              <Link to="/events" className="block w-full text-left text-lg font-light text-muted-foreground hover:text-foreground">Events</Link> {/* <-- Add Events Link */}
              <Link to="/contact" className="block w-full text-left text-lg font-light text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
            <div className="mt-auto space-y-4">
              {user ? (
                <>
                  {isSuperadmin ? (
                     <Button variant="outline" className="w-full" onClick={() => navigate('/admin')}>Admin Panel</Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                  )}
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <Button onClick={() => navigate('/login')} className="w-full neumorphic-button">
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;