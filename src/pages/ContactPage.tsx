import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Phone, MapPin, Briefcase, GraduationCap, School, User, MessageSquare, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const serviceOptions = [
    { name: "Student Services", icon: GraduationCap },
    { name: "Educator Services", icon: Briefcase },
    { name: "Institutional Services", icon: School },
    { name: "Other Inquiry", icon: Mail },
];

const leftPanelContent = [
    { 
        icon: Lightbulb, 
        title: "Let's Build Your Future, Together.", 
        description: "Have a question or ready to start your journey? We're here to help. Select a service to begin the conversation." 
    },
    { 
        icon: User, 
        title: "Great! Let's Get to Know You.", 
        description: "Your privacy is our priority. The information you provide helps us connect you with the right expert on our team." 
    },
    { 
        icon: MessageSquare, 
        title: "We're Listening.", 
        description: "This is your space to tell us what's on your mind. The more detail you provide, the better we can assist you." 
    },
    { 
        icon: Check, 
        title: "Thank You!", 
        description: "We've received your message and are already working on it. An expert will reach out to you within one business day." 
    },
]

const ContactPage = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        service: '',
        name: '',
        email: '',
        message: ''
    });

    const handleServiceSelect = (service: string) => {
        setFormData(prev => ({ ...prev, service }));
        setStep(1);
    };

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };
    
    const handleMessageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Final Form Data:", formData);
        setStep(3);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const progressPercentage = step / 3 * 100;

    return (
        <div className="min-h-screen bg-muted">
            <div className="container grid lg:grid-cols-2 min-h-screen">
                {/* Left Panel - The "Responsive Guide" */}
                <div className="relative lg:flex flex-col justify-center p-12 hidden">
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-gray-50 -z-10"></div>
                    <div className="relative h-96">
                        {leftPanelContent.map((content, index) => {
                            const Icon = content.icon;
                            return (
                                <div key={index} className={cn("absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out", step === index ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8")}>
                                    <div className="flex justify-center mb-8">
                                        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                                            <Icon className="w-10 h-10 text-primary" />
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-bold text-primary mb-4 text-center">{content.title}</h2>
                                    <p className="text-lg text-muted-foreground text-center">
                                        {content.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    {step === 3 && (
                        <div className="mt-12 space-y-6 animate-fadeInUp">
                            <a href="mailto:info@knowlex.com" className="flex items-center gap-4 group">
                                <Mail className="w-6 h-6 text-primary/70" />
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">info@knowlex.com</p>
                            </a>
                            <a href="tel:+123456789" className="flex items-center gap-4 group">
                                <Phone className="w-6 h-6 text-primary/70" />
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">+1 (234) 567-890</p>
                            </a>
                        </div>
                    )}
                </div>

                {/* Right Panel - The Interactive Form */}
                <div className="flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-12">
                    <div className="w-full max-w-md mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl">
                        {/* Progress Bar */}
                        <div className="mb-12">
                            {step < 4 && <p className="text-sm font-medium text-primary mb-2">Step {step + 1} of 3</p>}
                            <div className="bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden h-96">
                            <div className={cn("absolute inset-0 transition-all duration-500 ease-in-out", step === 0 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full")}>
                                <h3 className="text-2xl font-bold mb-6">What can we help you with?</h3>
                                <div className="space-y-4">
                                    {serviceOptions.map(opt => (
                                        <button key={opt.name} type="button" onClick={() => handleServiceSelect(opt.name)} className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 text-left hover:border-primary hover:bg-primary/5 transition-all">
                                            <opt.icon className="w-6 h-6 text-primary" />
                                            <span className="font-semibold">{opt.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <form onSubmit={handleDetailsSubmit} className={cn("absolute inset-0 transition-all duration-500 ease-in-out", step === 1 ? "opacity-100 translate-x-0" : `opacity-0 ${step < 1 ? 'translate-x-full' : '-translate-x-full'}`)}>
                                <h3 className="text-2xl font-bold mb-6">Tell us about yourself.</h3>
                                <div className="space-y-4">
                                    <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-3 border-gray-300 border rounded-md" />
                                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-3 border-gray-300 border rounded-md" />
                                    <Button type="submit" className="w-full !mt-6" size="lg">Next Step <ArrowRight className="ml-2 w-5 h-5"/></Button>
                                    <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                                </div>
                            </form>

                            <form onSubmit={handleMessageSubmit} className={cn("absolute inset-0 transition-all duration-500 ease-in-out", step === 2 ? "opacity-100 translate-x-0" : `opacity-0 ${step < 2 ? 'translate-x-full' : '-translate-x-full'}`)}>
                                <h3 className="text-2xl font-bold mb-6">How can we help?</h3>
                                <textarea name="message" placeholder="Your message..." onChange={handleChange} required className="w-full h-40 p-3 border-gray-300 border rounded-md" />
                                <Button type="submit" className="w-full !mt-6" size="lg">Send Message</Button>
                                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                            </form>

                            <div className={cn("absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out", step === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full")}>
                                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <Check className="w-8 h-8"/>
                                 </div>
                                 <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                 <p className="text-muted-foreground">Thank you, {formData.name}. We've received your inquiry and will be in touch within 24 hours.</p>
                                 <Button variant="outline" className="mt-6" onClick={() => setStep(0)}>Send Another Message</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;