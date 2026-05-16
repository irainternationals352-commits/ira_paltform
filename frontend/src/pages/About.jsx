import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { resolveMediaUrl } from '../utils/media';

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getAboutContent();
      setData(res.data);
    };
    fetchData();
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-light-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white pt-40 pb-28 px-4 text-center relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10"
        >
          {data.title}
        </motion.h1>
        <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full relative z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={resolveMediaUrl(data.image)} alt="About Us" className="rounded-2xl shadow-2xl" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-dark-900 mb-6">Empowering Students Globally</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {data.description}
            </p>
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-primary-500">
              <h3 className="text-xl font-bold text-dark-900 mb-3">Our Mission</h3>
              <p className="text-gray-600">{data.mission}</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-900 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            "{data.vision}"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
