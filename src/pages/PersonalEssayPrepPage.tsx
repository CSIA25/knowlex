import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Target, BookOpen, Mic, PenTool, Users, Eye, BrainCircuit, Sparkles, FileText, Heart } from 'lucide-react';

const strategies = [
  { title: "Be Authentic", icon: Heart, content: "Use your own voice, sense of humor, and natural way of speaking. Write about what's genuinely important to you, not just what you think will impress. Honesty about your journey resonates more strongly than a glib victory speech." },
  { title: "Grab the Reader From the Start", icon: Target, content: "Start with an opening that seizes the imagination. A bold statement, a thoughtful quote, or a descriptive scene can serve as a roadmap, engaging the reader and presenting the purpose of your writing immediately." },
  { title: "Focus on Deeper Themes", icon: BrainCircuit, content: "Admissions officers want to know who you are. Connect your achievements to your personal growth. How did winning the game or volunteering inspire your journey and aspirations? What did you discover about yourself?" },
  { title: "Show, Don’t Tell", icon: Eye, content: "The most engaging writing “shows” by setting scenes and providing anecdotes, rather than just listing accomplishments. Reciting a list is boring; take the reader on your emotional journey." },
  { title: "Try Doing Something Different", icon: Lightbulb, content: "Approach your subject from a new perspective. Instead of writing about your wins, what if you wrote about what you learned from your losses? A fresh angle on a common theme is more memorable than a perfect but predictable story." },
  { title: "Write With the Reader in Mind", icon: Users, content: "Build a clear and logical argument where one thought flows naturally from another. Use transitions. Ensure your essay is organized, makes sense, and provides all the necessary background information without being wordy." },
  { title: "Write Several Drafts", icon: PenTool, content: "Start writing months before your essay is due. Set it aside for a few days and return with a fresh perspective. This distance is crucial for effective revision and enhancement." },
  { title: "Read It Aloud", icon: Mic, content: "A classic writer’s tip: Reading your essay aloud instantly uncovers passages that sound clumsy, long-winded, or false. Your ears will catch what your eyes miss." },
  { title: "Don’t Repeat", icon: BookOpen, content: "Your essay should tell admissions officers something new about you that isn't already in another part of your application. Ensure it philosophically aligns with the rest of your profile." },
  { title: "Ask Others to Read Your Essay", icon: Users, content: "Get feedback from different demographic groups—a teacher, a parent, a friend. If anyone expresses confusion, revise until your message is perfectly clear." },
  { title: "Pay Attention to Form", icon: FileText, content: "Adhere to word limits (e.g., Common App's 650-word suggestion). Use a readable font, proper margins, and clear spacing. Your essay should look clean and inviting." },
  { title: "End Your Essay With a “Kicker”", icon: Sparkles, content: "A 'kicker' is a punchy final line or paragraph that brings everything together, leaving a lasting and impressive impression. It’s your final, memorable statement." },
];

const StrategySection = ({ strategy }: { strategy: any }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'strategy-section transition-all duration-500 ease-out',
        inView ? 'opacity-100 scale-100 blur-none' : 'opacity-30 scale-95 blur-sm'
      )}
    >
      <div className="flex items-start gap-x-6">
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-lg bg-primary/10">
          <strategy.icon className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-heading">{strategy.title}</h3>
          <p className="mt-2 text-base leading-7 text-gray-600">{strategy.content}</p>
        </div>
      </div>
    </div>
  );
};

const PersonalEssayPrepPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg font-semibold leading-8 text-primary">Our Proven Method</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            12 Strategies for an Unforgettable Essay
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your essay is more important than ever. It's your unique opportunity to stand out and show admissions officers who you truly are.
          </p>
        </div>
      </section>

      {/* Interactive Manuscript Section */}
      <section className="relative py-24 sm:py-32">
        <div className="absolute inset-0 z-0 animate-aurora bg-gradient-to-tr from-cyan-100 via-blue-100 to-sky-100" style={{backgroundSize: '400% 400%'}}></div>
        <div className="relative z-10 container">
          <div className="mx-auto max-w-3xl space-y-24">
            {strategies.map((strategy) => (
              <StrategySection key={strategy.title} strategy={strategy} />
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="bg-white py-20 sm:py-24">
            <div className="container">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Craft Your Masterpiece?</h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Our expert mentors are here to guide you through every step, from brainstorming to the final polish. Let's tell your story, together.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                            <Link to="/contact">
                                Book Your Essay Consultation <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default PersonalEssayPrepPage;