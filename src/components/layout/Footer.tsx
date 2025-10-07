import { Instagram, Twitter, Github, Shield, Truck, RotateCcw } from "lucide-react";
import type { Page } from "../../types";

interface FooterProps {
  onPageChange: (page: Page) => void;
}

export const Footer = ({ onPageChange }: FooterProps) => {
  return (
    <footer className="bg-black border-t-2 border-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div>
            <span className="text-2xl font-black text-white uppercase tracking-tighter mb-6 block">
              OstentaGang
            </span>
            <p className="text-gray-400 mb-8 leading-relaxed font-light">
              Premium streetwear. Minimal design. Maximum impact.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Github].map((Icon, idx) => (
                <button
                  key={idx}
                  className="w-12 h-12 border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase">Products</h3>
            <ul className="space-y-4 text-gray-400 font-light">
              {["T-Shirts", "Hoodies", "Pants", "Jackets", "Accessories"].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onPageChange("produtos" as Page)}
                    className="hover:text-white transition-colors uppercase text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase">Company</h3>
            <ul className="space-y-4 text-gray-400 font-light">
              {[
                { label: "About Us", page: "sobre" as Page },
                { label: "Contact", page: "contato" as Page },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onPageChange(item.page)}
                    className="hover:text-white transition-colors uppercase text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {["Careers", "Press"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition-colors uppercase text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase">Support</h3>
            <ul className="space-y-4 text-gray-400 font-light">
              {["Help Center", "Returns", "Size Guide", "Tracking"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition-colors uppercase text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 font-light text-sm">
            © 2025 OstentaGang. All rights reserved.
          </p>
          <div className="flex items-center flex-wrap justify-center gap-8">
            {[
              { icon: Shield, label: "Secure Purchase" },
              { icon: Truck, label: "Free Shipping" },
              { icon: RotateCcw, label: "30 Day Returns" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-gray-500">
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};