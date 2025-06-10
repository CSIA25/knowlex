import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, BookOpen, Mic, PenTool, Users, Eye, BrainCircuit, Sparkles, Languages } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const timelineSteps = [
  {
    title: "Assessment & Profiling",
    icon: BrainCircuit,
    description: "We start with a deep-dive into your academic and extracurricular profile to identify your unique strengths and align them with global opportunities.",
    features: ["Academic strength evaluation", "Career goal alignment", "Personalized scholarship matching"]
  },
  {
    title: "Profile Building",
    icon: Users,
    description: "We strategically enhance your profile by recommending impactful extracurriculars, leadership roles, and international competitions to make you a standout candidate.",
    features: ["Extracurricular planning", "Leadership development", "Portfolio creation assistance"]
  },
  {
    title: "Language Preparation",
    icon: Languages,
    description: "Master the required language proficiency tests with our specialized, high-impact preparation classes for IELTS and other languages.",
    features: ["IELTS & TOEFL Prep", "German Language Courses", "Japanese Language Courses"]
  },
  {
    title: "Essay & Application Crafting",
    icon: PenTool,
    description: "Our experts guide you to write compelling personal essays and applications that tell your unique story and captivate admissions officers.",
    features: ["Compelling storytelling", "Structure & outline development", "Grammar & style review"]
  },
  {
    title: "Interview & Visa Prep",
    icon: Mic,
    description: "Gain confidence with mock interviews and get comprehensive support for your visa application, ensuring you are fully prepared for the final steps.",
    features: ["Mock interview sessions", "Documentation preparation", "Scenario-based coaching"]
  },
  {
    title: "Success & Beyond",
    icon: Sparkles,
    description: "Celebrate your acceptance! Our support continues with pre-departure briefings and access to our global alumni network.",
    features: ["Acceptance negotiation", "Pre-departure support", "Alumni network access"]
  }
];

const ScholarshipPage = () => {
    const [selectedStep, setSelectedStep] = useState<typeof timelineSteps[0] | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground pt-28 pb-16">
            <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
                <DialogContent className="glass-card">
                    {selectedStep && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-glow text-3xl flex items-center gap-3">
                                    <selectedStep.icon className="w-8 h-8 text-primary" />
                                    {selectedStep.title}
                                </DialogTitle>
                                <DialogDescription className="pt-2 text-base">{selectedStep.description}</DialogDescription>
                            </DialogHeader>
                            <ul className="space-y-3 pt-4">
                                {selectedStep.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-accent"/>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <motion.div 
                className="container mx-auto px-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                <div className="text-center mb-20">
                    <motion.h1 variants={{hidden: {opacity: 0, y:20}, visible: {opacity: 1, y: 0}}} className="text-5xl md:text-7xl font-light text-glow mb-4">Your Scholarship Roadmap</motion.h1>
                    <motion.p variants={{hidden: {opacity: 0, y:20}, visible: {opacity: 1, y: 0}}} transition={{delay: 0.1}} className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        A step-by-step journey from aspiring student to international scholar, with expert guidance at every milestone.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* The timeline line */}
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-primary/10 rounded-full"></div>
                    
                    <div className="space-y-16">
                        {timelineSteps.map((step, index) => (
                            <motion.div 
                                key={index}
                                className="flex items-center relative"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-[calc(50%-2.5rem)]">
                                    {index % 2 === 0 && (
                                        <div className="text-right pr-8">
                                            <h3 className="text-2xl font-semibold text-primary">{step.title}</h3>
                                            <p className="text-muted-foreground mt-2">{step.description.substring(0, 70)}...</p>
                                            <Button variant="link" className="p-0 h-auto mt-2" onClick={() => setSelectedStep(step)}>Learn More</Button>
                                        </div>
                                    )}
                                </div>
                                <div className="w-20 h-20 bg-background border-4 border-primary/20 rounded-full flex-shrink-0 z-10 flex items-center justify-center">
                                    <step.icon className="w-8 h-8 text-primary"/>
                                </div>
                                <div className="w-[calc(50%-2.5rem)]">
                                    {index % 2 !== 0 && (
                                        <div className="pl-8">
                                            <h3 className="text-2xl font-semibold text-primary">{step.title}</h3>
                                            <p className="text-muted-foreground mt-2">{step.description.substring(0, 70)}...</p>
                                            <Button variant="link" className="p-0 h-auto mt-2" onClick={() => setSelectedStep(step)}>Learn More</Button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                 <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mt-24"
                >
                    <h2 className="text-3xl font-bold">Ready to Begin?</h2>
                    <p className="text-muted-foreground mt-2 mb-6">Let's build your personalized roadmap to success.</p>
                    <Button size="lg" className="neumorphic-button text-lg" asChild>
                        <Link to="/payment">
                            Start My Journey <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ScholarshipPage;