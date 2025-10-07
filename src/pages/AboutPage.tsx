import { Users, Target, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  const values = [
    {
      icon: Users,
      title: 'Community',
      desc: 'More than a brand, we are a community of people who share a passion for streetwear',
    },
    {
      icon: Target,
      title: 'Quality',
      desc: 'Commitment to excellence in every detail, from fabric selection to final finishing',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      desc: 'Always seeking new ways to surprise with unique designs and exclusive trends',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-7xl font-black mb-8 text-black tracking-tight">
            Our Story
          </h1>
          <p className="text-2xl text-gray-600 leading-relaxed font-light">
            OstentaGang was born from a passion for streetwear and the desire to create something
            unique
          </p>
        </div>

        <div className="space-y-24">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8 text-black">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg font-light">
                To democratize access to quality streetwear in Brazil, offering exclusive pieces
                that combine urban style, comfort, and durability.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg font-light">
                Each piece is carefully developed with the Brazilian youth in mind who seek to
                stand out with authenticity and attitude.
              </p>
            </div>
            <div className="border-2 border-black p-14 rounded-xl">
              <div className="grid grid-cols-2 gap-10 text-center">
                <div>
                  <div className="text-5xl font-black text-black mb-3">10K+</div>
                  <div className="text-gray-600 font-medium uppercase text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-black mb-3">150+</div>
                  <div className="text-gray-600 font-medium uppercase text-sm">Unique Products</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-black mb-3">5</div>
                  <div className="text-gray-600 font-medium uppercase text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-black mb-3">4.8★</div>
                  <div className="text-gray-600 font-medium uppercase text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map((item, idx) => (
              <div key={idx} className="text-center border-2 border-black p-10 rounded-xl">
                <item.icon className="h-16 w-16 text-black mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-5 text-black uppercase">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
