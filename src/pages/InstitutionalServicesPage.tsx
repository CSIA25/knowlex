import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Check } from 'lucide-react';

const institutionalServices = [
  {
    slug: "school-founding",
    title: "School Founding & Operations",
    description: "Comprehensive guidance for establishing and operating educational institutions.",
    features: [
      "Curriculum development and implementation",
      "Facilities design and planning",
      "Staff recruitment and training",
      "Regulatory compliance assistance"
    ],
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "teacher-outsourcing",
    title: "Global Teacher Outsourcing",
    description: "Access qualified international educators to enhance your school's teaching capabilities.",
    features: [
      "Rigorous teacher screening and selection",
      "Seamless onboarding process",
      "Ongoing professional development",
      "Performance monitoring and feedback"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "teacher-support",
    title: "Comprehensive Teacher Support",
    description: "Holistic support services to maximize teacher effectiveness and satisfaction.",
    features: [
      "Professional development programs",
      "Mentoring and coaching",
      "Wellbeing and stress management",
      "Career progression planning"
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "remote-educator",
    title: "Remote Educator Services",
    description: "Leverage technology to bring expert educators to your school, regardless of location.",
    features: [
      "Virtual teaching specialists",
      "Hybrid classroom setup assistance",
      "Digital teaching resources",
      "Technical support and training"
    ],
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "exchange-programs",
    title: "International Teacher Exchange",
    description: "Facilitate transformative cultural and educational exchanges for your teaching staff.",
    features: [
      "Bi-directional teacher exchanges",
      "Cultural immersion opportunities",
      "Global perspective building",
      "School partnership formations"
    ],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "ib-integration",
    title: "IB Integration & Adoption",
    description: "Expert guidance for schools transitioning to or enhancing their IB curriculum.",
    features: [
      "IB program implementation roadmap",
      "Teacher training and certification",
      "Curriculum alignment strategies",
      "Authorization preparation support"
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
  }
];

const ServiceCard = ({ service }: { service: typeof institutionalServices[0] }) => (
    <motion.div 
        className="relative group rounded-2xl overflow-hidden glass-card h-96"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
    >
        <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-white/80 mb-4">{service.description}</p>
            <Link to="/contact">
                <Button variant="secondary" className="w-full">Learn More <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
        </div>
    </motion.div>
);

const InstitutionalServicesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-16">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
        >
            <div className="inline-block bg-primary/10 p-4 rounded-2xl mb-6">
                <Building className="w-12 h-12 text-primary"/>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">For Institutions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Strategic consulting and support to help your school achieve global standards of excellence.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {institutionalServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InstitutionalServicesPage;