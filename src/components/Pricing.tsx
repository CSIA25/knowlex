
import React, { useEffect, useRef, useState } from 'react';

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for exploring your options',
      features: [
        'Basic university search',
        'General admission requirements',
        'Community forum access',
        'Newsletter with tips',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$299',
      period: 'per month',
      description: 'Comprehensive guidance for serious applicants',
      features: [
        'Personalized mentorship',
        'Application essay review',
        'Interview preparation',
        'Scholarship opportunities',
        'Visa guidance',
        'Priority support',
      ],
      cta: 'Start Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'Tailored solutions for institutions',
      features: [
        'Bulk student guidance',
        'Institution partnerships',
        'Custom branding',
        'Analytics dashboard',
        'Dedicated account manager',
        'White-label solution',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-light mb-6 text-glow">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Select the perfect plan to accelerate your educational journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`scroll-fade-in ${isVisible ? 'visible' : ''} relative`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                </div>
              )}

              <div className={`glass-card p-8 h-full flex flex-col group hover:scale-105 transform transition-all duration-500 ${
                plan.popular ? 'ring-2 ring-primary/50' : ''
              }`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-light">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-2">/{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground font-light">{plan.description}</p>
                </div>

                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <i className="ph-check text-primary mt-1 flex-shrink-0"></i>
                        <span className="text-muted-foreground font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
                  plan.popular 
                    ? 'neumorphic-button text-foreground hover:scale-105' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 scroll-fade-in ${isVisible ? 'visible' : ''} delay-500`}>
          <p className="text-muted-foreground font-light">
            All plans include 30-day money-back guarantee • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
