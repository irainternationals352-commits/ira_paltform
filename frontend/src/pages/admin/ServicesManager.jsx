import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { resolveMediaUrl } from '../../utils/media';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const initialFormState = {
    title: '', slug: '', short_description: '', full_description: '', icon: 'FaCheck',
    features: [], process: []
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/services/`);
      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files?.[0] || formData.image });
  };

  const handleArrayChange = (index, field, key, value) => {
    const newArray = [...formData[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], { name: '' }] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.slug) {
          dataToSubmit.slug = dataToSubmit.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      
      // Filter out empty items
      dataToSubmit.features = dataToSubmit.features.filter(f => f.name.trim());
      dataToSubmit.process = dataToSubmit.process.filter(p => p.name.trim());
      
      const payload = new FormData();
      Object.entries(dataToSubmit).forEach(([key, value]) => {
        if (key === 'features' || key === 'process') {
          payload.append(key, JSON.stringify(value));
        } else if (key === 'image') {
          if (value instanceof File) payload.append(key, value);
        } else if (value !== undefined && value !== null) {
          payload.append(key, value);
        }
      });
      
      if (formData.id) {
        await axios.patch(`${API_BASE_URL}/services/${formData.slug}/`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/services/`, payload);
      }
      setShowForm(false);
      setFormData(initialFormState);
      fetchData();
    } catch (error) {
      alert("Error saving service.");
    }
  };

  const deleteService = async (slug) => {
    if (window.confirm("Delete this service?")) {
      try {
        await axios.delete(`${API_BASE_URL}/services/${slug}/`);
        fetchData();
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  const editService = (service) => {
    setFormData({
      ...service,
      features: service.features.map(f => typeof f === 'string' ? {name: f} : f) || [],
      process: service.process.map(p => typeof p === 'string' ? {name: p} : p) || []
    });
    setShowForm(true);
  };

  const renderArraySection = (title, field, placeholder) => (
    <div className="mt-6 p-4 bg-white border rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-gray-800">{title}</h4>
        <button type="button" onClick={() => addArrayItem(field)} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-100">+ Add {title.split(' ')[1]}</button>
      </div>
      {formData[field].map((item, idx) => (
        <div key={idx} className="flex gap-2 mb-2 items-center">
          <input 
            placeholder={placeholder} 
            value={item.name || ''} 
            onChange={(e) => handleArrayChange(idx, field, 'name', e.target.value)} 
            className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" 
          />
          <button type="button" onClick={() => removeArrayItem(idx, field)} className="text-red-500 hover:text-red-700 px-2 font-bold">✕</button>
        </div>
      ))}
      {formData[field].length === 0 && <p className="text-gray-400 text-sm italic">No items added yet.</p>}
    </div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-dark-900">Manage Services</h2>
        <button 
          onClick={() => {
            setFormData(initialFormState);
            setShowForm(!showForm);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add New Service'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Service Title *</label>
              <input name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
              <input name="short_description" value={formData.short_description} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Description</label>
              <textarea name="full_description" value={formData.full_description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 rounded-lg border border-gray-300"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Service Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white" />
              {formData.image && !(formData.image instanceof File) && (
                <img src={resolveMediaUrl(formData.image)} alt="Current service" className="mt-3 h-24 w-40 rounded-lg object-cover border border-gray-200" />
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderArraySection('Service Features', 'features', 'e.g., Profile Evaluation')}
            {renderArraySection('Service Process', 'process', 'e.g., Step 1: Initial Consultation')}
          </div>
          <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors">
            Save Service
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map(service => (
              <tr key={service.slug} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-dark-900">{service.title}</td>
                <td className="p-4 text-sm text-gray-600">{service.short_description}</td>
                <td className="p-4 text-right whitespace-nowrap">
                  <button onClick={() => editService(service)} className="text-primary-600 hover:text-primary-800 font-medium text-sm mr-4 transition-colors">Edit</button>
                  <button onClick={() => deleteService(service.slug)} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesManager;
