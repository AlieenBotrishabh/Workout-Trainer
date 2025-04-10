// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-lighter border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-white font-display text-xl font-bold">Pose<span className="text-primary">Trainer</span></span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Train smarter with AI-powered pose detection
            </p>
          </div>
          
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-2">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <Link to="/exercises" className="text-gray-400 hover:text-white text-sm">
                Exercises
              </Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-400 hover:text-white text-sm">
                Profile
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} PoseTrainer. All rights reserved. Made with 
            <Heart className="h-4 w-4 mx-1 inline-block text-red-500" /> by AI Fitness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;