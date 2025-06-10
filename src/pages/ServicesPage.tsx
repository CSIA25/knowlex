import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const studentServices = [
  {
    slug: "assessment",
    title: "Student Assessment & Profiling",
    description: "Comprehensive evaluation to identify scholarship opportunities matching your strengths and goals.",
    features: [
      "Academic strength evaluation",
      "Extracurricular assessment",
      "Career goal alignment",
      "Personalized scholarship matching",
      "Opportunity gap analysis"
    ],
    color: 'hsl(var(--primary))'
  },
  {
    slug: "profile-building",
    title: "Profile Building",
    description: "Strategic enhancement of your academic and extracurricular profile to maximize scholarship potential.",
    features: [
      "Academic record optimization",
      "Extracurricular activity planning",
      "Leadership experience development",
      "Community service guidance",
      "Portfolio creation assistance"
    ],
     color: 'hsl(var(--secondary))'
  },
  {
    slug: "roadmap",
    title: "Scholarship Roadmap",
    description: "Customized timeline and action plan to guide your scholarship application journey.",
    features: [
      "Timeline development for applications",
      "Milestone tracking system",
      "Priority scholarship identification",
      "Application deadline management",
      "Progress monitoring and adjustments"
    ],
     color: 'hsl(var(--accent))'
  },
  {
    slug: "prep-classes",
    title: "Preparation Classes",
    description: "Specialized courses to prepare you for scholarship requirements and examinations.",
    features: [
      "Standardized test preparation",
      "Subject-specific tutoring",
      "Essay writing workshops",
      "Interview skills training"
    ],
     color: 'hsl(250, 100%, 70%)'
  },
  {
    slug: "essay-prep",
    title: "Personal Essay Prep",
    description: "Expert guidance on crafting compelling personal statements and scholarship essays.",
    features: [
      "Topic selection guidance",
      "Compelling storytelling techniques",
      "Grammar and style review",
      "Final editing and polishing"
    ],
    color: 'hsl(300, 100%, 70%)'
  },
  {
    slug: "visa-prep",
    title: "Visa Interview Prep",
    description: "Comprehensive preparation for visa interviews to ensure successful scholarship acceptance.",
    features: [
      "Mock interview sessions",
      "Documentation preparation",
      "Question and answer practice",
      "Non-verbal communication coaching"
    ],
    color: 'hsl(350, 100%, 70%)'
  },
];

const ServicesPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeService = studentServices[activeIndex];
    
    return (
        <div className="min-h-screen bg-background text-foreground pt-28 pb-16 overflow-x-hidden">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">Our Student Services</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        An ecosystem of support designed to transform your potential into a global reality. Select a service to explore.
                    </p>
                </motion.div>
                
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Left: Service List */}
                    <div className="lg:col-span-1">
                        <ul className="space-y-2">
                           {studentServices.map((service, index) => (
                               <li key={service.slug}>
                                   <button 
                                       onClick={() => setActiveIndex(index)}
                                       className={cn(
                                           "w-full text-left p-4 rounded-lg transition-all duration-300 border-l-4",
                                           activeIndex === index 
                                               ? "bg-primary/10 border-primary text-foreground scale-105" 
                                               : "border-transparent hover:bg-muted/50"
                                       )}
                                   >
                                       <span className="font-semibold text-lg">{service.title}</span>
                                   </button>
                               </li>
                           ))}
                        </ul>
                    </div>

                    {/* Right: Service Details */}
                    <div className="lg:col-span-2 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-card p-10 rounded-2xl relative"
                            >
                                <motion.div className="text-3xl font-bold mb-4 font-heading text-glow" style={{color: activeService.color}}>{activeService.title}</motion.div>
                                <p className="text-lg text-muted-foreground mb-8">{activeService.description}</p>

                                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                                    {activeService.features.map((feature, i) => (
                                        <motion.div 
                                            key={feature} 
                                            className="flex items-start gap-3"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                        >
                                            <Check className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                <Button size="lg" className="neumorphic-button" asChild>
                                    <Link to="/contact">
                                        Inquire About This Service
                                        <ArrowRight className="ml-2 w-5 h-5"/>
                                    </Link>
                                </Button>

                                {/* Animated Background Sphere */}
                                <motion.div 
                                    key={activeIndex + '-bg'}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full" 
                                    style={{ background: `radial-gradient(circle, ${activeService.color}33 0%, transparent 70%)`}}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;