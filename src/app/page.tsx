"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TypewriterEffect from "@/components/TypewriterEffect";
import { 
  Building2, Wallet, Layers, Smartphone, Bell, 
  BarChart3, LayoutDashboard, Zap, GraduationCap, Users, BookOpen, Sparkles, ChevronRight, ShieldCheck, LineChart, Leaf, Clock
} from "lucide-react";

const features = [
  {
    title: "Complete Digitalization",
    description: "Fully digitalize your school from the ground up. Streamline operations, reduce paperwork, and embrace the future.",
    icon: <Building2 className="w-8 h-8 text-indigo-600" />
  },
  {
    title: "Flexible Fee Engine",
    description: "Accept payments offline or online. Support for waive-offs, partial payments, and customizable structures.",
    icon: <Wallet className="w-8 h-8 text-teal-600" />
  },
  {
    title: "Hybrid Fee Structures",
    description: "Support any frequency for fee payments—monthly, quarterly, or yearly. Easily mix and match requirements.",
    icon: <Layers className="w-8 h-8 text-sky-600" />
  },
  {
    title: "Unified Parent Portal",
    description: "A single, intuitive platform connecting parents, students, and school administrators for seamless communication.",
    icon: <Users className="w-8 h-8 text-orange-600" />
  },
  {
    title: "Comprehensive Tracking",
    description: "Parents can fully track their ward's academic journey online, from examination results to pending fee payments.",
    icon: <Smartphone className="w-8 h-8 text-purple-600" />
  },
  {
    title: "Smart Notifications",
    description: "Admins can instantly deliver announcements. Plus, WhatsApp notifications for important events are coming soon!",
    icon: <Bell className="w-8 h-8 text-pink-600" />
  },
  {
    title: "Customizable Exams",
    description: "Design and implement any examination type or grading system that perfectly fits your curriculum.",
    icon: <BookOpen className="w-8 h-8 text-red-600" />
  },
  {
    title: "Reporting Dashboard",
    description: "Access a bird's-eye view of your school's performance. Generate comprehensive reports with just a single click.",
    icon: <LayoutDashboard className="w-8 h-8 text-emerald-600" />
  },
  {
    title: "Lightning Fast UX",
    description: "Enjoy a blazingly fast application with zero page reloads. Engineered for maximum efficiency and speed.",
    icon: <Zap className="w-8 h-8 text-yellow-600" />
  },
  {
    title: "Multi-Platform Access",
    description: "Manage your school on the go! Colegios is fully optimized and available across Android, iOS, and Windows.",
    icon: <Smartphone className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Effortless Admissions",
    description: "Simplify your enrollment process. Handle new admissions smoothly with an intuitive workflow.",
    icon: <GraduationCap className="w-8 h-8 text-fuchsia-600" />
  },
  {
    title: "One-Click Management",
    description: "Track everything effortlessly. Class management, student profiles, and staff coordination at your fingertips.",
    icon: <BarChart3 className="w-8 h-8 text-cyan-600" />
  }
];

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Animated Hero Section */}
      <section className="relative w-full pt-44 pb-48 lg:pt-52 lg:pb-56 overflow-hidden bg-linear-to-br from-blue-400 via-blue-700 to-slate-900 animate-gradient text-white">
        {/* Background Image with low opacity */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <Image 
            src="/images/banner-bg.jpg" 
            alt="School background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Extra overlay for contrast */}
        <div className="absolute inset-0 z-0 bg-blue-900/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left side: Texts */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-100 mb-8 shadow-xl"
              >
                <Sparkles size={20} className="text-yellow-500" />
                <span className="text-base sm:text-lg font-semibold tracking-wide text-slate-700">
                  A Flagship Product of <span className="font-extrabold ml-1 inline-flex items-center"><span className="bg-[#000080] text-white px-1.5 rounded-sm mr-0.5">A</span><span className="text-[#000080]">pp</span><span className="text-green-600">Mee</span> <span className="text-slate-900 ml-1.5">Pvt Ltd</span></span>
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg">
                Igniting a Digital <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-indigo-200 drop-shadow-md">
                  Revolution in Education.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-50 mb-10 leading-relaxed font-light drop-shadow">
                Colegios is an all-in-one, feature-rich school management ecosystem. We are building a stronger, smarter future by bringing cutting-edge digital infrastructure straight to the roots of our education system.
              </p>
              
              <div className="mb-10 text-left">
                <div className="inline-flex flex-col gap-2 relative">
                  <div className="absolute -inset-2 bg-linear-to-r from-blue-600/30 to-purple-600/30 blur-xl rounded-full"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-100 relative z-10 drop-shadow-md">
                    <Sparkles className="inline-block w-5 h-5 text-yellow-400 mr-2 -translate-y-0.5" />
                    A feature rich product:
                  </h3>
                  <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl shadow-2xl min-w-[320px] max-w-full sm:max-w-max">
                    <div className="text-yellow-400 font-extrabold text-xl sm:text-2xl min-h-10 flex items-center tracking-wide drop-shadow leading-tight whitespace-nowrap">
                      <TypewriterEffect />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="group flex items-center justify-center gap-2 bg-white text-blue-900 font-bold py-4 px-8 rounded-full hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
                >
                  Request a Demo
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link 
                  href="#features" 
                  className="flex items-center justify-center bg-blue-900/40 backdrop-blur-md border border-blue-400/30 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-800/50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                >
                  Explore Features
                </Link>
              </div>
            </motion.div>

            {/* Right side: Image with floating animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-4/3 max-w-lg mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center"
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-3"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
                    alt="Modern Education" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold text-lg drop-shadow-md">Empowering Educators</p>
                    <p className="text-blue-100 text-sm drop-shadow-sm">Everything on one click.</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 z-30"
              >
                <div className="bg-emerald-100 p-3 rounded-full">
                  <BarChart3 className="text-emerald-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Efficiency</p>
                  <p className="text-xl font-extrabold text-slate-900">+300%</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 z-30"
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <Bell className="text-blue-600 fill-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Instant</p>
                  <p className="text-lg font-bold text-slate-900">Alerts</p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Curved Partition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-0.5">
          <svg className="block w-full h-16 md:h-24 lg:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45,.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,24.2V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      {/* About / Vision Section */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 lg:mb-0"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                Our Aim: Empowering Education Through Technology
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We believe that by digitalizing schools—the very foundation of our nation—we can create a ripple effect of progress. Colegios eliminates administrative bottlenecks, empowering educators to focus on what they do best: teaching.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                From reducing paperwork to providing crystal-clear transparency for parents, our platform is engineered to foster a collaborative and efficient learning environment.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 pt-10">
                <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col items-center justify-center text-center aspect-square cursor-pointer">
                  <Users size={48} className="text-blue-500 mb-4" />
                  <h3 className="font-bold text-slate-800">Parent Portal</h3>
                  <p className="text-sm text-slate-500 mt-2">Connecting families</p>
                </div>
                <div className="bg-blue-600 p-6 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center aspect-square text-white cursor-pointer">
                  <Zap size={48} className="mb-4 text-yellow-300" />
                  <h3 className="font-bold">Fast UX</h3>
                  <p className="text-sm text-blue-100 mt-2">Zero reloads</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-900 p-6 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center aspect-square text-white cursor-pointer">
                  <Layers size={48} className="mb-4 text-indigo-300" />
                  <h3 className="font-bold">Fee Engine</h3>
                  <p className="text-sm text-indigo-200 mt-2">Hybrid structures</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col items-center justify-center text-center aspect-square cursor-pointer">
                  <Smartphone size={48} className="text-slate-700 mb-4" />
                  <h3 className="font-bold text-slate-800">Multi-Device</h3>
                  <p className="text-sm text-slate-500 mt-2">Android & iOS</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6"
            >
              Everything You Need on <span className="text-blue-600">One Click</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Our feature-rich application ensures that managing your school is no longer a chore, but a seamless experience that saves hours of administrative work.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-slate-50 rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it is a need Section */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6"
            >
              Why Your School Needs{" "}
              <span 
                className="inline-block text-blue-600 font-extrabold pb-1"
              >
                Colegios
              </span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
            >
              In today&apos;s fast-paced digital era, running a school with traditional paper-based methods is not just inefficient—it holds back student potential. Here is why upgrading is essential.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Need 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex gap-6"
            >
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">100% Paperless & Eco-Friendly</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Say goodbye to lost files, manual entry errors, and cluttered physical archives. Digitizing your operations saves money, protects the environment, and makes every record searchable in seconds.
                </p>
              </div>
            </motion.div>

            {/* Need 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex gap-6"
            >
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center">
                <Clock className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Time & Resource Optimization</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Automate repetitive administrative tasks like fee reminders, attendance tracking, and report card generation. Let your teachers focus on teaching rather than administrative bureaucracy.
                </p>
              </div>
            </motion.div>

            {/* Need 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex gap-6"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center">
                <LineChart className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Real-Time Data & Insights</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Make data-driven decisions instantly. Access comprehensive dashboards that show academic progress, fee collections, and staff attendance all in real-time, anytime, from anywhere.
                </p>
              </div>
            </motion.div>

            {/* Need 4 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex gap-6"
            >
              <div className="bg-rose-50 w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-rose-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Bulletproof Security & Privacy</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Protect sensitive student and financial data with enterprise-grade cloud security. Role-based access ensures that staff and parents only see what they are authorized to see.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900 py-24 text-center px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Transform Your School?</h2>
          <p className="text-blue-100 text-lg mb-12 leading-relaxed font-light">
            We don&apos;t disclose our pricing publicly because we believe in providing tailored solutions. Contact us today to schedule a demo and discuss a plan that perfectly fits your institution&apos;s needs.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1 text-lg"
          >
            Connect With Us Now
            <Sparkles size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
