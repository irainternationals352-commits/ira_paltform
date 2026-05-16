import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaMoneyBillWave, FaClock, FaGraduationCap, FaBook, FaUsers, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const ProgramDetail = () => {
  const { programName } = useParams();
  const [searchParams] = useSearchParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  const uniName = searchParams.get('uniName');
  const fee = searchParams.get('fee');
  const duration = searchParams.get('duration');
  const intake = searchParams.get('intake');

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const decodedName = decodeURIComponent(programName);
        const slug = decodedName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const res = await axios.get(`${API_BASE_URL}/programs/${slug}/`);
        setProgram(res.data.show_in_listing === false ? null : res.data);
      } catch (error) {
        console.error("Failed to fetch program");
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [programName]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-xl text-primary-600">Loading Program...</div>;
  if (!program) return <div className="h-screen flex items-center justify-center font-bold text-xl text-red-500">Program not found!</div>;

  return (
    <div className="bg-light-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/universities" className="text-primary-400 hover:text-white flex items-center justify-center gap-2 mb-6 font-medium transition-colors">
            ← Back to Universities
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            {program.name}{uniName ? ` at ${uniName}` : ''}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 max-w-3xl mx-auto"
          >
            {program.description}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Program Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center gap-3">
                <FaBook className="text-primary-600" /> Program Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                    <FaClock className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase">Duration</p>
                    <p className="text-lg font-bold text-dark-900">{duration || program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                    <FaGraduationCap className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase">Degree</p>
                    <p className="text-lg font-bold text-dark-900">{program.degree}</p>
                  </div>
                </div>
                {intake && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                      <FaClock className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-semibold uppercase">Intake</p>
                      <p className="text-lg font-bold text-dark-900">{intake}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Career Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center gap-3">
                <FaUsers className="text-primary-600" /> Career Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.career_opportunities?.map((career, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-light-50 rounded-xl">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-dark-900 font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6">Skills You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.skills?.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-light-50 rounded-xl">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-dark-900 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Admission Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6">Admission Requirements</h2>
              <ul className="space-y-3">
                {program.requirements?.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 rounded-3xl p-8 shadow-xl border border-primary-800 text-white sticky top-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-white/20">
                  <FaMoneyBillWave className="text-secondary-400" />
                </div>
                <p className="text-primary-200 text-sm font-bold uppercase tracking-widest mb-2">{uniName ? `Tuition at ${uniName}` : 'Average Tuition'}</p>
                <h3 className="text-3xl font-extrabold text-white">{fee || program.average_fee}</h3>
              </div>

              <h4 className="text-xl font-bold mb-4 text-center">Interested in {program.name}{uniName ? ` at ${uniName}` : ''}?</h4>
              <p className="text-primary-100 text-center mb-8">Get expert guidance on program selection and university applications.</p>

              <Link to={`/apply?type=program&target=${encodeURIComponent(program.name)}${uniName ? `&university=${encodeURIComponent(uniName)}` : ''}`} className="w-full py-4 bg-white text-primary-900 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-all shadow-lg transform hover:-translate-y-1">
                Apply {uniName ? `to ${uniName}` : `for ${program.name}`}
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
