import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight ,CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// In a real application, this data would come from a CMS or an API
const allServicesData: any = {
    'student-assessment-profiling': {
        title: "Student Assessment & Profiling",
        category: "For Students",
        description: "A comprehensive evaluation to identify your unique strengths, align them with career goals, and match you with the perfect scholarship opportunities worldwide.",
        features: ["Academic Strength Evaluation", "Extracurricular Assessment", "Career Goal Alignment", "Personalized Scholarship Matching"],
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
    },
    'ib-integration': {
        title: "IB Integration & Adoption",
        category: "For Institutions",
        description: "Expert, end-to-end guidance for schools looking to transition to or enhance their International Baccalaureate (IB) curriculum.",
        features: ["IB Program Implementation Roadmap", "Teacher Training and Certification", "Curriculum Alignment Strategies", "Authorization Preparation Support", "Ongoing Compliance Management"],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
    },
    // Add other service details here as needed...
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? allServicesData[serviceId] : null;

  if (!service) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28">
            <h1 className="text-4xl font-bold">Service Not Found</h1>
            <p className="text-muted-foreground mt-4">The service you're looking for doesn't exist or may have been moved.</p>
            <Button asChild className="mt-8">
                <Link to="/services">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Services
                </Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-28">
        <div className="container pb-24">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
                    <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative h-full flex flex-col justify-end p-12 text-white">
                        <p className="font-semibold text-accent">{service.category}</p>
                        <h1 className="text-4xl lg:text-6xl font-bold font-heading mt-2">{service.title}</h1>
                    </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-16 items-start">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold font-heading mb-4">Service Overview</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>

                        <h3 className="text-2xl font-bold font-heading mt-12 mb-6">Key Features</h3>
                        <ul className="space-y-4">
                            {service.features.map((feature: string, index: number) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-lg text-gray-700">{feature}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <aside className="lg:sticky top-28 glass-card bg-muted/50 p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold font-heading mb-6">Ready to Start?</h3>
                        <p className="text-muted-foreground mb-6">Let's discuss how our {service.title} service can help you achieve your goals.</p>
                        <Button size="lg" className="w-full" asChild>
                            <Link to="/contact">
                                Book a Consultation <ArrowRight className="ml-2 w-5 h-5"/>
                            </Link>
                        </Button>
                    </aside>
                </div>

            </motion.div>
        </div>
    </div>
  );
};

export default ServiceDetailPage;