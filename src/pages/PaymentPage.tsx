import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Briefcase, GraduationCap, School } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceOptions = [
    { name: "Student Services", icon: GraduationCap },
    { name: "Educator Services", icon: Briefcase },
    { name: "Institutional Services", icon: School },
];

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
};

const PaymentPage = () => {
    const [step, setStep] = useState(0);
    const [selection, setSelection] = useState('');
    const navigate = useNavigate();

    const handleSelect = (value: string) => {
        setSelection(value);
        setStep(1);
    };

    return (
        <div className="min-h-screen animated-gradient-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 left-8 z-20"
            >
                <Link to="/" className="text-2xl font-semibold text-glow hover:opacity-80 transition-opacity">
                    Knowlex
                </Link>
            </motion.div>

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div key="step0" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="w-full max-w-3xl text-center">
                        <h1 className="text-4xl md:text-6xl font-light text-glow mb-4">Let's Get Started.</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-12">First, tell us who you are.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {serviceOptions.map(opt => (
                                <motion.button 
                                    key={opt.name} 
                                    onClick={() => handleSelect(opt.name)} 
                                    className="group glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <opt.icon className="w-16 h-16 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                                    <span className="font-semibold text-lg text-foreground">{opt.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
                {step === 1 && (
                    <motion.div key="step1" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="text-center">
                        <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                            <Check className="w-12 h-12"/>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light text-glow mb-4">Excellent Choice!</h1>
                        <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
                            You've selected <span className="font-semibold text-primary">{selection}</span>. The best way to proceed is to book a free consultation so we can tailor a plan specifically for you.
                        </p>
                         <Button size="lg" className="neumorphic-button text-lg" onClick={() => navigate('/contact')}>
                            Book Free Consultation <ArrowRight className="ml-2 w-5 h-5"/>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentPage;