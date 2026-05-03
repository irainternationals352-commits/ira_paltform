import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeadsManager = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/enquiries/');
      setLeads(res.data);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await axios.delete(`http://localhost:8000/api/enquiries/${id}/`);
        fetchLeads();
      } catch (error) {
        alert("Failed to delete lead");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark-900">Enquiries & Leads</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Specifics</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">No leads found.</td>
              </tr>
            ) : leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-dark-900">{lead.full_name}</div>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  <div>{lead.email}</div>
                  <div>{lead.phone}</div>
                </td>
                <td className="p-4">
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold border border-primary-100">
                    {lead.lead_type}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                  {lead.interested_country && <div className="truncate"><strong className="text-gray-900">Country:</strong> {lead.interested_country}</div>}
                  {lead.interested_course && <div className="truncate"><strong className="text-gray-900">Course:</strong> {lead.interested_course}</div>}
                  {lead.service_type && <div className="truncate"><strong className="text-gray-900">Service:</strong> {lead.service_type}</div>}
                  {lead.preferred_date && <div className="truncate"><strong className="text-gray-900">Date:</strong> {lead.preferred_date} {lead.preferred_time}</div>}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => deleteLead(lead.id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsManager;
