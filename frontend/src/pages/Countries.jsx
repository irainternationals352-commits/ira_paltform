import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { resolveMediaUrl } from '../utils/media';

const Countries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getCountries();
      setCountries(res.data.filter(item => item.show_in_listing !== false));
    };
    fetchData();
  }, []);

  return (
    <div className="bg-light-50 min-h-screen">
      {/* Header */}
      <div className="relative pt-40 pb-28 px-4 text-center overflow-hidden bg-[#062544]">
        {/* Background Image */}
        <img 
          src="/countries_bg.jpeg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031122]/90 via-[#09223c]/85 to-[#05162b]/90"></div>
        
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10 text-white uppercase tracking-wider">Study Destinations</h1>
        <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full mb-8 relative z-10"></div>
        <p className="text-xl text-blue-100/90 max-w-3xl mx-auto relative z-10 font-medium leading-relaxed">
          From premium universities and industry-focused programs to international exposure and long-term growth opportunities — we help you choose the destination that aligns with your future vision.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {countries.map((country, index) => (
            <Link to={`/countries/${country.slug}`} key={index}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden shadow-xl h-96 cursor-pointer"
              >
                <img src={resolveMediaUrl(country.banner_image)} alt={country.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-3xl font-bold text-white mb-2">{country.name}</h3>
                  <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{country.short_description}</p>
                  <span className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    Explore Details
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
