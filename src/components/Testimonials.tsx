import { useState } from 'react';
import { Quote } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const testimonials = [
  {
    name: 'Sarah Chen',
    destination: 'PhD at Oxford, UK',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop&crop=face',
    quote: 'Knowlex transformed my dream into reality. Their personalized guidance helped me secure a full scholarship to one of the top universities in the world. The mentorship was invaluable.',
    span: 'col-span-1 row-span-2',
  },
  {
    name: 'Ahmed Hassan',
    destination: 'Master\'s at MIT, USA',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&crop=face',
    quote: 'The expert mentorship was a game-changer. I received a $50,000 scholarship for my Master\'s program at MIT, something I couldn\'t have navigated alone.',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Maria Rodriguez',
    destination: 'Visa for Canada',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop&crop=face',
    quote: 'The visa guidance service was exceptional. My student visa was approved in just two weeks with zero complications. I felt supported at every single step.',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'David Kim',
    destination: 'Hospitality in Australia',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop&crop=face',
    quote: 'Knowlex\'s network opened doors I never knew existed. The career mapping was spot-on, and now I\'m thriving in my culinary career in Sydney.',
    span: 'col-span-1 row-span-2',
  },
   {
    name: 'Priya Sharma',
    destination: 'Teacher in Singapore',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&crop=face',
    quote: 'As a teacher, finding an international position seemed daunting. Knowlex made it seamless, from profile building to contract negotiation. I love my new school!',
    span: 'col-span-1 row-span-1',
  },
];

const Testimonials = () => {
  const [selectedStory, setSelectedStory] = useState<typeof testimonials[0] | null>(null);

  return (
    <section id="testimonials" className="bg-muted py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Success Stories</h2>
          <p className="section-subheading">
            Real results from students and professionals who trusted us with their future. Their success is our greatest achievement.
          </p>
        </div>

        <div className="mt-20 group grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 md:gap-6 h-[70vh]">
          {testimonials.map((story) => (
            <div
              key={story.name}
              className={`relative rounded-2xl overflow-hidden cursor-pointer ${story.span}`}
              onClick={() => setSelectedStory(story)}
            >
              <img
                src={story.photo}
                alt={story.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale group-hover:brightness-50 hover:!grayscale-0 hover:!brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 p-6 flex flex-col justify-end">
                <h3 className="font-bold text-white text-lg">{story.name}</h3>
                <p className="text-white/80 text-sm">{story.destination}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-lg">
          {selectedStory && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <img src={selectedStory.photo} alt={selectedStory.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedStory.name}</DialogTitle>
                    <p className="text-primary">{selectedStory.destination}</p>
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription className="pt-4">
                <Quote className="w-10 h-10 text-gray-200 mb-4" />
                <p className="text-lg text-gray-600 leading-relaxed">{selectedStory.quote}</p>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;