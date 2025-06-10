import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Award, Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';

const teacherServices = [
  {
    slug: "international-teaching",
    title: "International Teaching Opportunities",
    description: "Connect with prestigious schools worldwide and advance your teaching career globally.",
    icon: Globe,
    features: [
      "Placement in international schools across 30+ countries",
      "Comprehensive support with visa and relocation",
      "Contract negotiation assistance",
      "Cultural adaptation training",
      "Ongoing professional support"
    ],
    image: "https://images.unsplash.com/photo-1573164713712-03790a178651?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "teacher-training",
    title: "Teacher Training & Development",
    description: "Enhance your teaching skills and advance your career with our specialized training programs.",
    icon: Award,
    features: [
      "IB curriculum specialized training",
      "Modern teaching methodologies",
      "Digital classroom techniques",
      "Leadership development for educators",
      "Professional certification programs"
    ],
    image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "educator-fellowship",
    title: "Overseas Educator Fellowship",
    description: "Join our exclusive fellowship program for educators seeking international exposure and growth.",
    icon: Briefcase,
    features: [
      "3-6 month fellowship placements",
      "Cross-cultural teaching experience",
      "Research opportunities",
      "Global educator network access",
      "Publication and presentation opportunities"
    ],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1200&auto=format&fit=crop"
  }
];

const TeacherServicesPage = () => {
  const [activeTab, setActiveTab] = useState(teacherServices[0].slug);
  const activeService = teacherServices.find(s => s.slug === activeTab);

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-16">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
        >
            <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">Services for Educators</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Expand your horizons. We provide the tools, opportunities, and support to elevate your teaching career to the global stage.
            </p>
        </motion.div>

        <div className="glass-card rounded-2xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Tabs */}
            <div className="flex md:flex-col gap-2">
              {teacherServices.map(service => (
                <button
                  key={service.slug}
                  onClick={() => setActiveTab(service.slug)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4",
                    activeTab === service.slug 
                      ? "bg-primary/90 text-primary-foreground shadow-lg" 
                      : "bg-muted/50 hover:bg-muted/80"
                  )}
                >
                  <service.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="font-semibold hidden md:inline">{service.title}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 relative min-h-[60vh] rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img src={activeService?.image} alt={activeService?.title} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-8 flex flex-col justify-end text-white">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="text-4xl font-bold mb-4"
                    >
                      {activeService?.title}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="text-lg mb-6 max-w-2xl"
                    >
                      {activeService?.description}
                    </motion.p>
                    <motion.ul 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, staggerChildren: 0.1 }}
                      className="space-y-3 mb-8"
                    >
                      {activeService?.features.map(feature => (
                        <motion.li key={feature} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-3">
                          <Check className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/80" asChild>
                            <Link to="/contact">
                                Inquire Now <ArrowRight className="ml-2 w-5 h-5"/>
                            </Link>
                        </Button>
                     </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherServicesPage;