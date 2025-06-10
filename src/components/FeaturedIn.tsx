import { cn } from '@/lib/utils';

const publications = [
  'Forbes',
  'TechCrunch',
  'Times Higher Education',
  'QS World Rankings',
  'Coursera',
  'EdSurge',
  'Harvard Business Review'
];

// We duplicate the array to create a seamless loop
const extendedPublications = [...publications, ...publications];

const FeaturedIn = () => {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Trusted by students worldwide and featured in
        </h2>
        <div className="mt-10 w-full overflow-hidden">
          <div className="flex animate-marquee">
            {extendedPublications.map((name, index) => (
              <div key={index} className="flex-shrink-0 px-8 w-auto">
                <p className="text-center text-2xl font-bold text-gray-400 filter grayscale hover:grayscale-0 hover:text-gray-600 transition-all duration-300">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedIn;