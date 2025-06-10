import { useState } from 'react';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const faqData = {
  general: [
    {
      question: 'How does Knowlex differ from other education consultancies?',
      answer: 'We combine AI-powered matching with human expertise to provide personalized guidance. Our platform offers 24/7 support, real-time application tracking, and access to exclusive scholarships through our global network.',
    },
    {
      question: 'What is your success rate for university admissions?',
      answer: 'Our students have a 95% success rate in gaining admission to their target universities. We achieve this through personalized guidance, comprehensive application support, and our extensive network of partner institutions.',
    },
    {
      question: 'How do you match students with universities?',
      answer: 'Our AI algorithm considers your academic background, career goals, budget, preferred location, and personal preferences to suggest the best-fit universities. Our human advisors then review and refine these recommendations.',
    },
  ],
  services: [
    {
      question: 'Do you provide visa assistance?',
      answer: 'Yes, we offer comprehensive visa guidance including document preparation, interview coaching, and ongoing support throughout the visa application process. Our team stays updated with the latest visa requirements for all major study destinations.',
    },
    {
      question: 'Can I change my plan or cancel my subscription?',
      answer: 'Absolutely! You can upgrade, downgrade, or cancel your subscription at any time. We offer a 30-day money-back guarantee on all paid plans, and there are no cancellation fees.',
    },
    {
      question: 'What kind of scholarships can I access through Knowlex?',
      answer: 'We provide access to merit-based scholarships, need-based aid, country-specific grants, and exclusive scholarships from our partner universities. Our database includes opportunities worth over $100 million annually.',
    },
  ],
};

const FaqItem = ({ faq, isOpen, onClick }: { faq: any; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <dt>
        <button onClick={onClick} className="flex w-full items-start justify-between text-left text-gray-900">
          <span className="text-base font-semibold leading-7">{faq.question}</span>
          <span className="ml-6 flex h-7 items-center">
            {isOpen ? (
              <Minus className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Plus className="h-6 w-6" aria-hidden="true" />
            )}
          </span>
        </button>
      </dt>
      <dd className={cn("overflow-hidden transition-all duration-500 ease-in-out", isOpen ? "mt-4 pr-12 max-h-96" : "max-h-0")}>
        <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
      </dd>
    </div>
  );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading">
            Find quick answers to common questions about our services, process, and platform. If you don't see your question here, feel free to contact us.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16 sm:space-y-0">
            <div>
                <h3 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">General</h3>
                {faqData.general.map((faq, i) => (
                    <FaqItem key={`general-${i}`} faq={faq} isOpen={openIndex === `general-${i}`} onClick={() => handleToggle(`general-${i}`)} />
                ))}
            </div>
            <div>
                <h3 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Services & Support</h3>
                {faqData.services.map((faq, i) => (
                    <FaqItem key={`services-${i}`} faq={faq} isOpen={openIndex === `services-${i}`} onClick={() => handleToggle(`services-${i}`)} />
                ))}
            </div>
          </dl>
        </div>
        <div className="mt-20 rounded-2xl bg-muted p-10 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Still have questions?</h3>
            <p className="mt-4 text-base leading-7 text-gray-600">
                Can’t find the answer you’re looking for? Our team is here to help. Get in touch and we’ll get back to you as soon as possible.
            </p>
            <div className="mt-6">
                <Button size="lg" asChild>
                    <Link to="/contact">
                        <MessageSquare className="mr-2 h-5 w-5"/> Contact Our Team
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;