import { Target, Sparkles, Truck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { StarRating } from '../components/ui/StarRating';
import { collections, testimonials } from '../data/mockData';
import type { Page } from '../types';

interface HomePageProps {
  onPageChange: (page: Page) => void;
}

export const HomePage = ({ onPageChange }: HomePageProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/placeholder.svg?height=1080&width=1920&query=minimalist+black+white+streetwear+fashion)`,
            filter: 'brightness(0.4) grayscale(100%)',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-black mb-8 text-white tracking-tighter leading-none animate-fade-in-up">
            OSTENTA GANG
          </h1>
          <p
            className="text-lg md:text-2xl mb-12 text-gray-300 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Premium streetwear. Minimal design. Maximum impact.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              className="bg-white text-black px-12 py-5 text-base font-bold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-lg"
              onClick={() => onPageChange('produtos')}
            >
              Shop Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white px-12 py-5 text-base font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
              onClick={() => onPageChange('sobre')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-black tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Premium quality meets minimalist design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-black mx-auto mb-6 flex items-center justify-center rounded-lg">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Carefully selected materials and impeccable finishing in every piece
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-black mx-auto mb-6 flex items-center justify-center rounded-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Minimal Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Clean, timeless aesthetics that never go out of style
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-black mx-auto mb-6 flex items-center justify-center rounded-lg">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick and secure shipping throughout Brazil
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
              Collections
            </h2>
            <p className="text-lg text-gray-400 font-light">
              Discover our curated streetwear collections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div key={collection.id} className="group cursor-pointer">
                <div className="relative h-80 overflow-hidden bg-gray-900 mb-6 rounded-lg">
                  <img
                    src={collection.image || '/placeholder.svg'}
                    alt={collection.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                    {collection.name}
                  </h3>
                  <p className="text-gray-400 mb-3 leading-relaxed">{collection.description}</p>
                  <p className="text-white font-semibold">{collection.itemCount} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-black tracking-tight">
              What Clients Say
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Over 10,000 satisfied customers across Brazil
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border-2 border-black p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-black text-lg mb-2">{testimonial.name}</h4>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-gray-700 mb-5 leading-relaxed">"{testimonial.comment}"</p>
                <p className="text-black font-semibold text-sm uppercase">{testimonial.product}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Stay Updated
          </h2>
          <p className="text-lg mb-12 text-gray-400 font-light">
            Get the latest drops, exclusive releases, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
            <Input
              placeholder="Your email address"
              className="flex-1 bg-white text-black border-0 py-6 px-6 text-base rounded-lg"
            />
            <Button className="bg-white text-black px-10 py-6 font-bold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
