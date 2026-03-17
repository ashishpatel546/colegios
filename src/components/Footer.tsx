import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t-8 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <Image 
                  src="/images/logo1.png" 
                  alt="Colegios App Logo" 
                  width={90} 
                  height={90} 
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white leading-none">Colegios</h3>
                <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Digitalizing India</span>
              </div>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              We are on a mission to digitalize the nation, starting with the root of education. Let&apos;s build a brighter future for the next generation.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+918005004357" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} className="text-blue-400" />
                8005004357
              </a>
              <a href="tel:+919716160389" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} className="text-blue-400" />
                9716160389
              </a>
              <a href="mailto:info@colegios.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={16} className="text-blue-400" />
                info@colegios.in
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Join Us</h3>
            <p className="text-sm leading-relaxed mb-4">
              We don&apos;t disclose our pricing here. For pricing and to schedule a comprehensive demo of how Colegios can transform your school, please connect with us today.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Request a Demo
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm flex flex-col items-center justify-center gap-2 text-slate-400">
          <p className="flex items-center justify-center gap-1">
            Developed with <Heart size={16} className="text-red-500 fill-red-500" /> by enthusiastic engineers from 
            <span className="font-semibold ml-1 flex items-center bg-white px-2 py-0.5 rounded text-slate-800">
              <span className="bg-[#000080] text-white px-1 rounded-sm mr-px">A</span>
              <span className="text-[#000080]">pp</span>
              <span className="text-green-600">Me</span>
              <span className="ml-1">Pvt Ltd.</span>
            </span>
          </p>
          <p>&copy; {new Date().getFullYear()} Colegios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
