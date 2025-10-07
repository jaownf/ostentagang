import { Phone, Mail, MapPin, Instagram, Twitter, Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ContactPage = () => {
  const contactInfo = [
    { icon: Phone, title: 'Phone', info: '(11) 99999-9999', sub: 'Mon-Fri, 9am-6pm' },
    { icon: Mail, title: 'Email', info: 'contact@ostentagang.com', sub: 'Response within 24h' },
    {
      icon: MapPin,
      title: 'Address',
      info: 'Fashion Street, 123 - Vila Madalena',
      sub: 'São Paulo - SP, 05433-000',
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Github, label: 'GitHub' },
  ];

  const faqs = [
    {
      q: 'How does exchange and return work?',
      a: 'You have up to 30 days to exchange or return products in perfect condition. Return shipping is on us.',
    },
    {
      q: 'What is the delivery time?',
      a: 'We deliver throughout Brazil. The deadline varies from 3 to 10 business days, depending on your location.',
    },
    {
      q: 'How to choose the right size?',
      a: 'We have a detailed size chart for each product. If in doubt, our team can help.',
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept credit card, debit, PIX and bank slip. We split up to 12x interest-free.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-7xl font-black mb-8 text-black tracking-tight">
            Contact Us
          </h1>
          <p className="text-2xl text-gray-600 leading-relaxed font-light">
            We're here to help you. Get in touch!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black mb-6 text-black">Get in Touch</h2>
              <p className="text-gray-700 mb-10 leading-relaxed text-lg font-light">
                Our team is always ready to serve you in the best way possible.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((contact, idx) => (
                <div key={idx} className="flex items-center gap-6 border-2 border-black p-8 rounded-xl">
                  <div className="w-16 h-16 bg-black flex items-center justify-center flex-shrink-0 rounded-lg">
                    <contact.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-black uppercase">{contact.title}</h3>
                    <p className="text-gray-700 font-medium">{contact.info}</p>
                    <p className="text-sm text-gray-500">{contact.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-black uppercase">Follow Us</h3>
              <div className="flex gap-5">
                {socialLinks.map((social, idx) => (
                  <button
                    key={idx}
                    className="border-2 border-black px-8 py-4 font-bold uppercase text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
                  >
                    {social.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-12 rounded-xl">
            <h2 className="text-3xl font-black mb-10 text-black uppercase">Send a Message</h2>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold mb-3 text-black uppercase">Name</label>
                  <Input
                    placeholder="Your full name"
                    className="bg-white border-2 border-black py-6 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-3 text-black uppercase">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white border-2 border-black py-6 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-black uppercase">Subject</label>
                <Input
                  placeholder="How can we help?"
                  className="bg-white border-2 border-black py-6 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-black uppercase">Message</label>
                <textarea
                  rows={6}
                  placeholder="Describe your question or suggestion..."
                  className="w-full bg-white border-2 border-black p-5 text-black rounded-lg"
                />
              </div>

              <Button className="w-full bg-black text-white py-6 font-bold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 rounded-lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-4xl font-black text-center mb-20 text-black uppercase">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-2 border-black p-10 rounded-xl">
                <h3 className="font-bold mb-5 text-black text-lg uppercase">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
