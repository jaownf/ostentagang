import { useState } from 'react';
import { ShoppingCart, User, Menu, X, Sun, Moon, Home, Package, Info, Mail } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import type { Page } from '../../types';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onCartOpen: () => void;
}

export const Header = ({ currentPage, onPageChange, onCartOpen }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();

  const navigationItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'produtos' as Page, label: 'Shop', icon: Package },
    { id: 'sobre' as Page, label: 'About', icon: Info },
    { id: 'contato' as Page, label: 'Contact', icon: Mail },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <div
              className="flex items-center cursor-pointer transition-all duration-300"
              onClick={() => onPageChange('home')}
            >
              <span className="text-2xl font-black text-black uppercase tracking-tighter">
                OstentaGang
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-12">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    currentPage === item.id
                      ? 'text-black'
                      : 'text-gray-400 hover:text-black'
                  }`}
                  onClick={() => onPageChange(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-5">
              <button
                className="hidden md:flex w-11 h-11 items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                className="relative w-11 h-11 flex items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
                onClick={onCartOpen}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-black text-white text-xs font-bold rounded-full">
                    {getTotalItems()}
                  </Badge>
                )}
              </button>

              <button className="hidden md:flex w-11 h-11 items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg">
                <User className="h-5 w-5" />
              </button>

              <button
                className="md:hidden w-11 h-11 flex items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-white z-50 md:hidden border-l-2 border-black">
            <div className="p-8">
              <div className="flex items-center justify-between mb-10">
                <span className="text-2xl font-black text-black uppercase">Menu</span>
                <button
                  className="w-11 h-11 flex items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-5">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-5 px-8 py-5 text-left font-bold uppercase text-sm tracking-wider transition-all duration-300 rounded-lg ${
                      currentPage === item.id
                        ? 'bg-black text-white'
                        : 'text-black border-2 border-black hover:bg-black hover:text-white'
                    }`}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};
