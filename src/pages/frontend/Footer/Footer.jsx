import {
    Facebook,
    Instagram,
    Twitter,
    MapPin,
    Phone,
    Mail,
  } from "lucide-react";
  
  const Footer = () => {
    return (
      <footer className="bg-[#2b1d1a] text-gray-300">
        {/* Top */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
  
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                BrewHaus
              </h2>
              <p className="text-sm leading-relaxed">
                Brewing premium coffee experiences across cities.
                Crafted with passion, served with warmth.
              </p>
  
              {/* Socials */}
              <div className="flex gap-4 mt-6">
                <a className="hover:text-white transition">
                  <Facebook size={20} />
                </a>
                <a className="hover:text-white transition">
                  <Instagram size={20} />
                </a>
                <a className="hover:text-white transition">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
  
            {/* Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="hover:text-white" id="home">Home</a></li>
                <li><a href="/" className="hover:text-white" id="games">Games</a></li>
                <li><a href="/menu" className="hover:text-white" id="menu">Menu</a></li>
                <li><a href="/cafes" className="hover:text-white" id="cafes">Our Cafes</a></li>
                <li><a href="/about" className="hover:text-white" id="about">About Us</a></li>
                <li><a href="/contact" className="hover:text-white" id="contact">Contact</a></li>
              </ul>
            </div>
  
            {/* Cafes */}
            <div>
              <h3 className="text-white font-semibold mb-4">
                Our Cafes
              </h3>
              <ul className="space-y-3 text-sm">
                <li>Mumbai</li>
                <li>Bangalore</li>
                <li>Delhi</li>
                <li>Pune</li>
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">
                Contact
              </h3>
  
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin size={18} />
                  Mumbai, India
                </li>
                <li className="flex gap-3">
                  <Phone size={18} />
                  +91 98765 43210
                </li>
                <li className="flex gap-3">
                  <Mail size={18} />
                  support@brewhaus.com
                </li>
              </ul>
            </div>
  
          </div>
        </div>
  
        {/* Bottom */}
        <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} BrewHaus. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  