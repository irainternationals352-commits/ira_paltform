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
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white pt-40 pb-28 px-4 text-center relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10 uppercase tracking-wider"
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
            <span className="text-primary-600 font-extrabold text-lg uppercase tracking-widest block">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-black text-dark-900 leading-tight">
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
              src={resolveMediaUrl(data.image)} 
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
          className="bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-gray-100 mb-28 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary-50 rounded-full opacity-40 blur-3xl -z-10"></div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center text-3xl shrink-0 shadow-sm">
              <FaUserTie />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-dark-900">
                Founder’s Global Vision & International Experience
              </h3>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded by a globally experienced entrepreneur with 10+ years of industry expertise, international living experience in Ukraine, Finland, and Canada, and travel exposure across 45+ countries, IRA International was built with a truly global mindset.
                </p>
                <p>
                  Through strong international connections with educational leaders, universities, entrepreneurs, hospitality networks, and business professionals worldwide, IRA International delivers strategic global opportunities designed for the modern generation.
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xl font-extrabold text-primary-600 tracking-wide uppercase">
                  Global experience. International network. Future-focused vision.
                </p>
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
            className="bg-gradient-to-br from-primary-900 to-primary-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center"
          >
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center text-2xl mb-6 shadow-sm">
              <FaGlobe />
            </div>
            <h4 className="text-2xl font-bold mb-4 uppercase tracking-wider">Ira Philosophy</h4>
            <p className="text-xl font-extrabold text-blue-100 leading-relaxed italic">
              "We believe true success is not only wealth, but freedom, growth, purpose, and the power to live globally without limits."
            </p>
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
