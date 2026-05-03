import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaUniversity, FaGlobeAmericas, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    leads: 0,
    universities: 0,
    countries: 0,
    services: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsRes, uniRes, countriesRes, servicesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/enquiries/'),
          axios.get('http://localhost:8000/api/universities/'),
          axios.get('http://localhost:8000/api/countries/'),
          axios.get('http://localhost:8000/api/services/')
        ]);
        
        setStats({
          leads: leadsRes.data.length,
          universities: uniRes.data.length,
          countries: countriesRes.data.length,
          services: servicesRes.data.length
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Leads', count: stats.leads, icon: FaUsers, color: 'bg-blue-500', link: '/admin-dashboard/leads' },
    { title: 'Universities', count: stats.universities, icon: FaUniversity, color: 'bg-purple-500', link: '/admin-dashboard/universities' },
    { title: 'Countries', count: stats.countries, icon: FaGlobeAmericas, color: 'bg-green-500', link: '/admin-dashboard/countries' },
    { title: 'Services', count: stats.services, icon: FaBriefcase, color: 'bg-orange-500', link: '/admin-dashboard/services' }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-6">
            <div className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{card.title}</p>
              <h3 className="text-3xl font-extrabold text-dark-900">{card.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-2xl font-bold text-dark-900 mb-4">Welcome to your Admin Portal</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          From here you can easily manage all your leads, update university details, add new countries, and edit your services. 
          Use the sidebar on the left to navigate between different sections.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/admin-dashboard/leads" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
            View Recent Leads
          </Link>
          <Link to="/admin-dashboard/universities" className="bg-light-50 text-dark-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors border border-gray-200">
            Manage Universities
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
