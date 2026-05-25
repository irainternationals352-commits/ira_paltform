import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCheckCircle, FaBuilding, FaMoneyBillWave, FaArrowRight, FaCalendarAlt, FaTrophy, FaUserGraduate, FaGlobeAmericas } from 'react-icons/fa';
import { resolveMediaUrl } from '../utils/media';

const UniversityDetail = () => {
  const { slug } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await api.getUniversityBySlug(slug);
        setUniversity(res.data.show_in_listing === false ? null : res.data);
      } catch (error) {
        console.error("Failed to fetch university");
      } finally {
        setLoading(false);
      }
    };
    fetchUniversity();
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-xl text-primary-600">Loading University...</div>;
  if (!university) return <div className="h-screen flex items-center justify-center font-bold text-xl text-red-500">University not found!</div>;

  return (
    <div className="bg-light-50 min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative pt-40 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={resolveMediaUrl(university.banner_image || university.logo)} alt={university.name} className="w-full h-full object-cover filter brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-2xl p-2 shadow-2xl flex-shrink-0">
            <img src={resolveMediaUrl(university.logo)} alt="Logo" className="w-full h-full object-contain rounded-xl" />
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <Link to="/universities" className="text-blue-200 hover:text-white flex items-center justify-center md:justify-start gap-2 mb-4 font-medium transition-colors">
              ← Back to Universities
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
            >
              {university.name}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-200 text-lg"
            >
              <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary-500" /> {university.location}, {university.country}</span>
              <span className="bg-primary-600 px-4 py-1 rounded-full text-white font-bold text-sm">Rank #{university.ranking}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Stats Strip */}
      {university.key_stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-wrap justify-around items-center gap-6">
            {university.key_stats.map((stat, index) => {
              const icons = [FaTrophy, FaUserGraduate, FaGlobeAmericas];
              const Icon = icons[index % icons.length] || FaCheckCircle;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-3">
                    <Icon size={20} />
                  </div>
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center gap-3">
                <FaBuilding className="text-primary-600" /> About University
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {university.overview}
              </p>
            </motion.div>

            {/* Popular Courses */}
            {university.popular_courses && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-gray-100"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">Popular Programs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {university.popular_courses.map((courseObj, idx) => {
                    const courseName = typeof courseObj === 'string' ? courseObj : courseObj.name;
                    const isExpanded = expandedCourse === idx;
                    return (
                      <div key={idx} className="bg-light-50 rounded-xl border border-gray-100 overflow-hidden hover:border-primary-300 transition-all duration-300">
                        <button
                          onClick={() => setExpandedCourse(isExpanded ? null : idx)}
                          className="w-full p-4 flex items-center gap-4 hover:bg-primary-50 transition-colors group text-left"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                            <FaUserGraduate />
                          </div>
                          <span className="text-dark-900 font-semibold group-hover:text-primary-700 transition-colors flex-grow">{courseName}</span>
                          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} className="text-gray-400 group-hover:text-primary-600 flex-shrink-0 transition-colors">
                            <FaArrowRight />
                          </motion.div>
                        </button>
                        {isExpanded && typeof courseObj === 'object' && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white"
                          >
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 font-medium mb-1">Duration</p>
                                <p className="text-dark-900 font-bold">{courseObj.duration || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 font-medium mb-1">Intake</p>
                                <p className="text-dark-900 font-bold">{courseObj.intake || 'N/A'}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-500 font-medium mb-1">Estimated Fee</p>
                                <p className="text-primary-600 font-bold">{courseObj.fee || 'N/A'}</p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Link 
                                to={`/programs/${encodeURIComponent(courseName)}?uniName=${encodeURIComponent(university.name)}&fee=${encodeURIComponent(courseObj.fee || '')}&duration=${encodeURIComponent(courseObj.duration || '')}&intake=${encodeURIComponent(courseObj.intake || '')}`} 
                                className="inline-block bg-primary-100 hover:bg-primary-200 text-primary-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                              >
                                View Full Program
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Facilities */}
            {university.facilities && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-gray-100"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">Campus Facilities</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {university.facilities.map((facility, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-lg">{typeof facility === 'string' ? facility : facility.facility_name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar CTA (Right Column) */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 rounded-3xl p-8 shadow-xl border border-primary-800 sticky top-32 text-white"
            >
              <div className="text-center mb-8 border-b border-primary-700 pb-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-white/20">
                  <FaMoneyBillWave className="text-secondary-400" />
                </div>
                <p className="text-primary-200 text-sm font-bold uppercase tracking-widest mb-2">Average Estimated Price</p>
                <h3 className="text-3xl font-extrabold text-white">{university.tuition_fee}</h3>
              </div>
              
              <h4 className="text-xl font-bold mb-4 text-center">Interested in {university.name.split(' ')[0]}?</h4>
              <p className="text-primary-100 text-center mb-8">Get expert guidance on admission requirements, scholarships, and visa processing.</p>

              <Link to={`/apply?type=university&target=${university.slug}`} className="w-full py-4 bg-white text-primary-900 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-all shadow-lg transform hover:-translate-y-1">
                <FaCalendarAlt /> Apply to {university.name.split(' ')[0]}
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;
