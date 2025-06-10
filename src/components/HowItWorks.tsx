import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ClipboardList, DraftingCompass, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    name: 'Consultation & Assessment',
    description: 'We begin with a deep dive into your academic profile, career aspirations, and personal goals. This foundational step ensures every recommendation we make is perfectly aligned with your unique potential.',
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: 'Personalized Roadmap',
    description: 'Using the initial assessment, our experts craft a detailed, step-by-step strategic plan. This roadmap outlines key milestones, from university selection to application deadlines and financial planning.',
    icon: DraftingCompass,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: 'Execution & Success',
    description: 'With your roadmap in hand, we provide continuous, hands-on support. We guide you through applications, essay writing, interview prep, and visa processes to ensure you achieve your goals.',
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1200&auto=format&fit=crop"
  },
];

const StepContent = ({ step, index, setActiveIndex }: { step: any, index: number, setActiveIndex: (index: number) => void }) => {
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, setActiveIndex, index]);

  return (
    <div ref={ref} className="h-screen flex items-center">
      <div className="relative w-full aspect-square max-w-lg mx-auto">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0077B6] to-[#48CAE4] rounded-full blur-2xl opacity-40"></div>
        <img src={step.image} alt={step.name} className="relative w-full h-full object-cover rounded-2xl shadow-2xl" />
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="how-it-works" className="bg-white py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Your Journey, Simplified.</h2>
          <p className="section-subheading">
            We've refined the path to global education into three clear, supportive, and effective steps.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="sticky top-28">
            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={step.name} className={cn("transition-all duration-300", activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-100')}>
                  <div className="flex items-center gap-x-4">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg transition-colors", activeIndex === index ? 'bg-primary' : 'bg-gray-200')}>
                      <step.icon className={cn("h-6 w-6", activeIndex === index ? 'text-white' : 'text-gray-600')} />
                    </div>
                    <h3 className="text-2xl font-bold font-heading">{step.name}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-gray-600 pl-16">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            {steps.map((step, index) => (
              <StepContent key={index} step={step} index={index} setActiveIndex={setActiveIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;