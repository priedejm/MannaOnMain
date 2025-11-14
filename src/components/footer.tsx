import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="mb-4">
              <img 
                src="/assets/RedLogo.webp" 
                alt="Manna on Main - Christian Books & Gifts" 
                className="h-16"
              />
            </Link>
            <p className="text-gray-600 mb-4 text-center md:text-left">
              Your source for Christian books, gifts, and more in High Point, NC.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                <Icon icon="logos:facebook" width={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                <Icon icon="logos:instagram-icon" width={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Store Information</h3>
            <div className="flex flex-col space-y-2 items-center md:items-start">
              <p className="flex items-center text-gray-600">
                <Icon icon="lucide:map-pin" className="mr-2" />
                1101 N Main St #202, High Point, NC 27262
              </p>
              <p className="flex items-center text-gray-600">
                <Icon icon="lucide:phone" className="mr-2" />
                <a href="tel:+13364344663" className="hover:text-primary transition-colors">
                  (336) 434-4663
                </a>
              </p>
              <div className="flex flex-col mt-4">
                <h4 className="font-medium mb-2 text-gray-800">Hours:</h4>
                <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                  <span>Monday</span>
                  <span>10 AM–6 PM</span>
                  <span>Tuesday</span>
                  <span>10 AM–6 PM</span>
                  <span>Wednesday</span>
                  <span>10 AM–6 PM</span>
                  <span>Thursday</span>
                  <span>10 AM–6 PM</span>
                  <span>Friday</span>
                  <span>10 AM–6 PM</span>
                  <span>Saturday</span>
                  <span>10 AM–4 PM</span>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Stay in the Loop</h3>
            <p className="text-gray-600 mb-4 text-center md:text-left">
              Subscribe to our newsletter for updates, promotions, and new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow"
              />
              <Button color="primary">
                Sign Up
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This form is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
              <Link to="/shop" className="text-sm text-gray-600 hover:text-primary">Shop All</Link>
              <Link to="/about-us" className="text-sm text-gray-600 hover:text-primary">About Us</Link>
              <Link to="/gift-cards" className="text-sm text-gray-600 hover:text-primary">Gift Cards</Link>
              <Link to="/the-bookshelf" className="text-sm text-gray-600 hover:text-primary">The Bookshelf</Link>
              <Link to="/contact-us" className="text-sm text-gray-600 hover:text-primary">Contact Us</Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2 items-center">
                <img src="/assets/PaymentIcons/visa.svg" alt="Visa" className="h-8" />
                <img src="/assets/PaymentIcons/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="/assets/PaymentIcons/americanexpress.svg" alt="American Express" className="h-8" />
                <img src="/assets/PaymentIcons/discover.svg" alt="Discover" className="h-8" />
                <img src="/assets/PaymentIcons/applepay.svg" alt="Apple Pay" className="h-8" />
                <img src="/assets/PaymentIcons/googlepay.svg" alt="Google Pay" className="h-8" />
                <img src="/assets/PaymentIcons/cashapp.svg" alt="Cash App" className="h-8" />
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Manna on Main. All rights reserved.
            </p>
            <Link
              to="/admin-login"
              className="text-xs text-gray-400 hover:text-gray-600 mt-2 inline-block"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};