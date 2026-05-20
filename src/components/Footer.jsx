"use client";

import Link from "next/link"; 
import { MapPin, Phone, Mail, Clock, X } from "lucide-react";
import { LogoFacebook } from "@gravity-ui/icons";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-[#FF4D30]">DriveFleet</h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            We offer a big range of vehicles for all your driving needs. We have the perfect car to meet your needs.
          </p>
          <div className="flex gap-4 pt-2 text-slate-500">
            <Link href="#" className="hover:text-[#FF4D30] transition-colors"><BsTwitterX size={20} /></Link>
            <Link href="#" className="hover:text-[#FF4D30] transition-colors"><FaFacebook size={20} /></Link>
            <Link href="#" className="hover:text-[#FF4D30] transition-colors"><BsInstagram size={20} /></Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-3 text-slate-400 font-semibold">
            <li><Link href="/cars" className="hover:text-white transition-colors">Our Fleet</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Working Hours</h3>
          <div className="space-y-3 text-slate-400 font-medium">
            <p className="flex items-center gap-2"><Clock size={18} /> Mon - Fri: 09:00AM - 09:00PM</p>
            <p className="flex items-center gap-2"><MapPin size={18} /> 123 Car Rental St, Barishal</p>
            <p className="flex items-center gap-2"><Phone size={18} /> +880 123-456789</p>
            <p className="flex items-center gap-2"><Mail size={18} /> support@drivefleet.com</p>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Subscription</h3>
          <p className="text-slate-400 font-medium">Subscribe to our newsletter for latest updates.</p>
          <input 
            type="email" 
            placeholder="Enter email address" 
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-[#FF4D30]"
          />
          <button className="w-full bg-[#FF4D30] hover:bg-[#e03d21] text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-[#FF4D30]/20 active:scale-[0.98]">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-slate-500 font-semibold text-sm">
        © {new Date().getFullYear()} DriveFleet. All Rights Reserved.
      </div>
    </footer>
  );
}