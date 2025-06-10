import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Globe, UserCheck, Zap, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Globe,
    title: "Global Network & Reach",
    description: "Our extensive network of partner universities and employers across the globe opens doors you never thought possible. We provide access to exclusive opportunities in over 50 countries.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    icon: UserCheck,
    title: "Personalized Expert Mentorship",
    description: "You're not just another number. You get a dedicated mentor, an expert in your field, who provides one-on-one guidance tailored to your unique strengths and aspirations.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    icon: Zap,
    title: "Proven Success & Efficiency",
    description: "With a 95% success rate in university admissions and visa approvals, our streamlined, AI-powered process ensures your application is not just complete, but compelling.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    icon: BarChart,
    title: "Data-Driven Strategic Planning",
    description: "We don't guess; we strategize. Our approach is backed by data analytics to create a career and education roadmap that maximizes your return on investment.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  },
];

// Sub-component to track when each visual comes into view
const FeatureVisual = ({ index, image, name, setActiveIndex }: { index: number, image: string, name: string, setActiveIndex: (index: number) => void }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the image is visible
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex]);

  return (
    <div ref={ref} className="h-screen flex items-center justify-center">
      <img
        src={image}
        alt={name}
        className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
      />
    </div>
  );
};

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Why Choose Knowlex?</h2>
          <p className="section-subheading">
            We provide more than just consulting; we offer a partnership dedicated to your success, backed by expertise, a global network, and a personalized approach.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Sticky Column (Text Content) */}
          <div className="lg:sticky top-28">
            <div className="space-y-12">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className={cn(
                    "transition-all duration-300", 
                    activeIndex === index ? 'opacity-100 scale-105' : 'opacity-50'
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300", 
                      activeIndex === index ? 'bg-primary' : 'bg-gray-200'
                    )}>
                      <feature.icon 
                        className={cn("h-6 w-6", activeIndex === index ? 'text-white' : 'text-gray-600')} 
                        aria-hidden="true" 
                      />
                    </div>
                    <h3 className="text-2xl font-bold font-heading">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-gray-600 pl-16">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Scrolling Column (Visuals) */}
          <div>
            {features.map((feature, index) => (
              <FeatureVisual 
                key={feature.image} 
                index={index} 
                image={feature.image}
                name={feature.title} 
                setActiveIndex={setActiveIndex} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;