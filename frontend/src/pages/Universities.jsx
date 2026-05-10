import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight, FaSearch } from 'react-icons/fa';
import { resolveMediaUrl } from '../utils/media';

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getUniversities();
      setUniversities(res.data);
    };
    fetchData();
  }, []);

  const filteredUniversities = universities.filter(uni => {
    const term = searchTerm.toLowerCase();
    return (
      uni?.name?.toLowerCase().includes(term) || 
      uni?.country?.toLowerCase().includes(term) ||
      (uni?.location && uni.location.toLowerCase().includes(term)) ||
      uni?.popular_courses?.some(course => {
        const courseName = typeof course === 'string' ? course : course?.name;
        return courseName?.toLowerCase().includes(term);
      })
    );
  });

  return (
    <div className="bg-light-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white pt-40 pb-28 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10">Top Universities</h1>
        <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full mb-8 relative z-10"></div>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto relative z-10">
          Discover world-class institutions and find the perfect match for your academic goals.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-10 relative z-10 px-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by university name, country, or program..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full text-dark-900 font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-2xl pl-14"
            />
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((uni, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={resolveMediaUrl(uni.banner_image || uni.logo)} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                  <img src={resolveMediaUrl(uni.logo)} alt="Logo" className="w-12 h-12 rounded-lg bg-white p-1 shadow-md object-contain" />
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{uni.name}</h3>
                    <p className="text-primary-200 text-sm">{uni.country}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                    <FaMapMarkerAlt className="text-primary-500" /> {uni.location?.split(',')[0]}
                  </span>
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold border border-primary-100">
                    Rank #{uni.ranking}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  <strong className="text-dark-900">Top Courses:</strong> {uni.popular_courses?.map(c => typeof c === 'string' ? c : c.name).join(', ')}
                </p>

                <div className="mt-auto">
                  <Link 
                    to={`/universities/${uni.slug}`} 
                    className="w-full inline-flex justify-center items-center gap-2 bg-light-50 hover:bg-primary-600 text-primary-600 hover:text-white px-6 py-3 rounded-xl font-bold transition-all border border-gray-100 hover:border-primary-600"
                  >
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">No universities found matching your search.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;
