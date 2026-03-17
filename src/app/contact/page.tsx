"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Mail, Phone, Send, MessagesSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    message: "",
  });

  const whatsappNumber = "918005004357";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I am ${formData.name} from ${formData.school}.\n\nMessage: ${formData.message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Let&apos;s Digitalize Your School
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Interested in transforming your school&apos;s management? We&apos;re here to help! 
            Please connect with us for pricing details or to request a comprehensive demo of Colegios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Left Side: Contact Details & QR */}
          <div className="bg-blue-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-blue-100 mb-10 max-w-sm leading-relaxed">
                Our enthusiastic team from <span className="inline-flex items-center font-bold mx-1 bg-white px-2 py-0.5 rounded text-slate-800"><span className="bg-[#000080] text-white px-1 rounded-sm mr-px">A</span><span className="text-[#000080]">pp</span><span className="text-green-600">Me</span> <span className="ml-1">Pvt Ltd</span></span> is ready to answer all your queries and get you started on your digital journey.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Phone className="text-blue-100" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Phone</p>
                    <a href="tel:+918005004357" className="font-semibold hover:text-blue-200 transition-colors">8005004357</a>
                    <span className="mx-2 text-blue-400">|</span>
                    <a href="tel:+919716160389" className="font-semibold hover:text-blue-200 transition-colors">9716160389</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Mail className="text-blue-100" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Email</p>
                    <a href="mailto:info@colegios.in" className="font-semibold hover:text-blue-200 transition-colors">info@colegios.in</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessagesSquare size={24} />
                Connect on WhatsApp
              </h3>
              <p className="text-sm text-blue-100 mb-6">
                Scan the QR code to chat with our experts instantly on WhatsApp.
              </p>
              <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                <QRCode value={whatsappUrl} size={150} />
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="p-10 lg:p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-800"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="school" className="block text-sm font-medium text-slate-700 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-800"
                  placeholder="Springfield High School"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-800"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                <Send size={20} />
                Send via WhatsApp
              </button>
              
              <p className="text-xs text-center text-slate-500 mt-4">
                Clicking the button will open WhatsApp with your message pre-filled.
              </p>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
