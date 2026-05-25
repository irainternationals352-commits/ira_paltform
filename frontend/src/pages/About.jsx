import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { resolveMediaUrl } from '../utils/media';
import { FaGlobe, FaCompass, FaHeart, FaUserTie } from 'react-icons/fa';

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getAboutContent();
      setData(res.data);
    };
    fetchData();
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center font-bold text-xl text-primary-600">Loading Brand Experience...</div>;

  return (
    <div className="bg-light-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="relative pt-40 pb-28 px-4 text-center overflow-hidden bg-[#062544]">
        {/* Background Image */}
        <img 
          src="/about_bg.jpeg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061f3a]/92 via-[#0b2f59]/88 to-[#061f3a]/92"></div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10 uppercase tracking-wider text-white"
        >
          WHO WE ARE
        </motion.h1>
        <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full relative z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Who We Are Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center mb-28">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-primary-600 font-bold text-xs uppercase tracking-[0.25em] inline-block bg-primary-50 px-3.5 py-1.5 rounded-full border border-primary-100/80 shadow-sm mb-2">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4.5xl font-black text-dark-900 leading-tight">
              More Than A Consultancy.<br />
              <span className="text-primary-500">A Global Lifestyle Brand.</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              IRA International is a premium international Migration consulting brand built for ambitious individuals who aspire to study globally, move internationally, build influential careers, and create a lifestyle without borders.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-3xl opacity-20 blur-xl"></div>
            <img 
              src={data.image ? resolveMediaUrl(data.image) : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"} 
              alt="About IRA International" 
              className="relative rounded-3xl shadow-2xl border border-gray-100 object-cover w-full h-[400px]" 
            />
          </motion.div>
        </div>

        {/* Founder's Global Vision & International Experience */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white via-light-50 to-primary-50/20 rounded-3xl p-8 md:p-14 shadow-2xl border border-primary-100/50 mb-28 relative overflow-hidden"
        >
          {/* Decorative premium shapes */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl"></div>
          <div className="absolute left-10 bottom-0 w-64 h-64 bg-secondary-400/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center text-4xl shrink-0 shadow-lg shadow-primary-600/20 ring-4 ring-primary-50">
              <FaUserTie />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl md:text-3.5xl font-black text-dark-900 leading-tight">
                Founder’s Global Vision <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">& International Experience</span>
              </h3>
              
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed font-medium">
                <p>
                  Founded by a globally experienced entrepreneur with <strong className="text-dark-900">10+ years of industry expertise</strong>, international living experience in <span className="text-primary-600 font-semibold">Ukraine, Finland, and Canada</span>, and travel exposure across <strong className="text-dark-900">45+ countries</strong>, IRA International was built with a truly global mindset.
                </p>
                <p>
                  Through strong international connections with educational leaders, universities, entrepreneurs, hospitality networks, and business professionals worldwide, IRA International delivers strategic global opportunities designed for the modern generation.
                </p>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <span className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 text-primary-800 font-extrabold text-[9px] xs:text-[10px] sm:text-xs tracking-wider uppercase px-4 py-2.5 rounded-full shadow-sm whitespace-nowrap">
                  Global Experience • International Network • Future-Focused Vision
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ira Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#031122] via-[#09223c] to-[#05162b] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border border-primary-950/80"
          >
            {/* Glowing blur shape */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl"></div>
            
            <div className="w-14 h-14 rounded-2xl bg-primary-900/50 border border-primary-500/30 text-secondary-400 flex items-center justify-center text-3xl mb-6 shadow-inner relative z-10">
              <FaGlobe />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-secondary-400 mb-4 relative z-10">Ira Philosophy</h4>
            <div className="relative z-10">
              <span className="text-5xl font-serif text-secondary-500 absolute -top-6 -left-4 opacity-40">“</span>
              <p className="text-xl md:text-2xl font-black text-white leading-relaxed italic pl-3">
                We believe true success is not only wealth, but <span className="text-secondary-400">freedom, growth, purpose</span>, and the power to live globally without limits.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-extrabold text-dark-900">
              Balancing Ambition & Growth
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              The founder of Ira International is deeply spiritual and believes true success comes from balancing inner growth with global ambition. This philosophy shapes the entire identity of the brand combining ancient wisdom with modern international opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-dark-900 mb-2">Ancient Wisdom</h5>
                <p className="text-sm text-gray-500">Rooted in spiritual balance, mindfulness, and purpose-driven living.</p>
              </div>
              <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-dark-900 mb-2">Modern Opportunities</h5>
                <p className="text-sm text-gray-500">World-class educational access, cross-border careers, and global mobility.</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
