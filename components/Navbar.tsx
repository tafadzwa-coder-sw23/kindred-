import React, { useState } from 'react';
import { Heart, Search, User, Menu, X, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Explore', icon: Search },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const handleNav = (view: string) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNav('landing')}>
            <div className="bg-teal-600 text-white p-1.5 rounded-lg mr-2">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Kindred</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center text-sm font-medium transition-colors duration-200 ${
                  currentView === item.id 
                    ? 'text-teal-600' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-4 h-4 mr-1.5" />
                {item.label}
              </button>
            ))}
            <Button 
                variant="primary" 
                size="sm" 
                onClick={() => handleNav('dashboard')}
                className="ml-4"
            >
              Start Volunteering
            </Button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.id 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
             <div className="pt-4 pb-2 px-3">
                <Button 
                    variant="primary" 
                    className="w-full justify-center"
                    onClick={() => handleNav('dashboard')}
                >
                    Find Opportunities
                </Button>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};