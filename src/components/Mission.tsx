import { Heart, Lightbulb, Rocket } from 'lucide-react';

const values = [
    {
      name: 'Accessibility',
      description: 'Making quality education and global opportunities accessible to students from all backgrounds.',
      icon: Heart,
    },
    {
      name: 'Innovation',
      description: 'Leveraging AI and cutting-edge technology to revolutionize educational guidance and mentorship.',
      icon: Lightbulb,
    },
    {
      name: 'Empowerment',
      description: 'Empowering every student and educator to achieve their highest potential on the world stage.',
      icon: Rocket,
    },
  ]
  
const Mission = () => {
  return (
    <section id="mission" className="relative bg-white py-24 sm:py-32">
        <div className="container">
            <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                {/* Left Column: Scrolling Text */}
                <div className="lg:pr-8">
                    <div className="max-w-md mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
                        <p className="mt-6 text-2xl lg:text-3xl font-medium leading-relaxed text-primary">
                            To empower individuals through global education, bridging cultural divides and fostering excellence in a connected world.
                        </p>
                        <dl className="mt-12 space-y-10">
                        {values.map((value) => (
                            <div key={value.name} className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                {value.name}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">{value.description}</dd>
                            </div>
                        ))}
                        </dl>
                    </div>
                </div>

                {/* Right Column: Sticky Image */}
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:sticky lg:top-28">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/5]">
                        <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWlzc2lvbnxlbnwwfHwwfHx8MA%3D%3D"
                            alt="A person looking through a telescope, symbolizing vision and future goals."
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Mission;