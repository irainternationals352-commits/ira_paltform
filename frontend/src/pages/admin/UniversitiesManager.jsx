import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { resolveMediaUrl } from '../../utils/media';

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const UniversitiesManager = () => {
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const initialFormState = {
    name: '', slug: '', country: '', location: '', ranking: '', tuition_fee: '', overview: '',
    show_in_listing: true,
    key_stats: [],
    facilities: [],
    popular_courses: []
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [uniRes, countryRes, programRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/universities/`),
        axios.get(`${API_BASE_URL}/countries/`),
        axios.get(`${API_BASE_URL}/programs/`)
      ]);
      setUniversities(uniRes.data);
      setCountries(countryRes.data);
      setPrograms(programRes.data.filter(program => program.show_in_listing !== false));
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (field, file) => {
    setFormData({ ...formData, [field]: file || formData[field] });
  };

  // --- Array Handlers ---
  const handleArrayChange = (index, field, key, value) => {
    const newArray = [...formData[field]];
    newArray[index][key] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleProgramSelect = (index, programName) => {
    const program = programs.find(p => p.name === programName);
    const newCourses = [...formData.popular_courses];
    newCourses[index] = {
      ...newCourses[index],
      name: programName,
      duration: program?.duration || newCourses[index].duration || '',
      fee: program?.average_fee || newCourses[index].fee || ''
    };
    setFormData({ ...formData, popular_courses: newCourses });
  };

  const addArrayItem = (field, newItem) => {
    setFormData({ ...formData, [field]: [...formData[field], newItem] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const getUniqueSlug = (name, currentId = null) => {
    const baseSlug = slugify(name);
    const usedSlugs = new Set(
      universities
        .filter(uni => uni.id !== currentId)
        .map(uni => uni.slug)
    );

    if (!usedSlugs.has(baseSlug)) {
      return baseSlug;
    }

    let suffix = 2;
    while (usedSlugs.has(`${baseSlug}-${suffix}`)) {
      suffix += 1;
    }
    return `${baseSlug}-${suffix}`;
  };

  const getErrorMessage = (error) => {
    const data = error.response?.data;
    if (!data) return "Error saving university. Please check all fields.";
    if (typeof data === 'string') return data;

    return Object.entries(data)
      .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
      .join('\n');
  };

  const cleanUniversityPayload = (data) => ({
    ...data,
    key_stats: (data.key_stats || [])
      .map(({ label = '', value = '' }) => ({ label: label.trim(), value: value.trim() }))
      .filter(stat => stat.label || stat.value),
    facilities: (data.facilities || [])
      .map(({ facility_name = '' }) => ({ facility_name: facility_name.trim() }))
      .filter(facility => facility.facility_name),
    popular_courses: (data.popular_courses || [])
      .map(({ name = '', duration = '', fee = '', intake = '' }) => ({
        name: name.trim(),
        duration: duration.trim(),
        fee: fee.trim(),
        intake: intake.trim()
      }))
      .filter(course => course.name || course.duration || course.fee || course.intake)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const countryObj = countries.find(c => c.name === formData.country);
      const { country, ...universityData } = formData;
      const dataToSubmit = { ...universityData };
      if (countryObj?.id) {
        dataToSubmit.country_id = countryObj.id;
      } else if (country) {
        dataToSubmit.country = country;
      }

      const cleanedData = cleanUniversityPayload(dataToSubmit);
      const payload = new FormData();
      Object.entries(cleanedData).forEach(([key, value]) => {
        if (key === 'key_stats' || key === 'facilities' || key === 'popular_courses') {
          payload.append(key, JSON.stringify(value));
        } else if (key === 'logo' || key === 'banner_image') {
          if (value instanceof File) payload.append(key, value);
        } else if (value !== undefined && value !== null) {
          payload.append(key, value);
        }
      });
      
      if (formData.id) {
        await axios.patch(`${API_BASE_URL}/universities/${formData.slug}/`, payload);
      } else {
        if(!cleanedData.slug) {
            cleanedData.slug = getUniqueSlug(cleanedData.name);
            payload.set('slug', cleanedData.slug);
        }
        await axios.post(`${API_BASE_URL}/universities/`, payload);
      }
      setShowForm(false);
      setFormData(initialFormState);
      fetchData();
    } catch (error) {
      alert(getErrorMessage(error));
      console.error(error.response?.data || error);
    }
  };

  const deleteUniversity = async (slug) => {
    if (window.confirm("Delete this university?")) {
      try {
        await axios.delete(`${API_BASE_URL}/universities/${slug}/`);
        fetchData();
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  const editUniversity = (uni) => {
    // Convert string array to objects for facilities if needed (backend returns objects now)
    setFormData({ 
      ...uni, 
      country: uni.country_name,
      key_stats: uni.key_stats || [],
      facilities: uni.facilities || [],
      popular_courses: uni.popular_courses || []
    });
    setShowForm(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-dark-900">Manage Universities</h2>
        <button 
          onClick={() => {
            setFormData(initialFormState);
            setShowForm(!showForm);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add New University'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">{formData.id ? 'Edit University' : 'Add University'}</h3>
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">University Name *</label>
              <input name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Country *</label>
              <select name="country" required value={formData.country} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white">
                <option value="">Select a Country</option>
                {countries.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Location / City</label>
              <input name="location" value={formData.location} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ranking (e.g., #1)</label>
              <input name="ranking" value={formData.ranking} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Overall Tuition Fee Range</label>
              <input name="tuition_fee" value={formData.tuition_fee} onChange={handleInputChange} placeholder="$50k - $60k / year" className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Overview Description</label>
              <textarea name="overview" value={formData.overview} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 rounded-lg border border-gray-300"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">University Logo</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange('logo', e.target.files?.[0])} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white" />
              {formData.logo && !(formData.logo instanceof File) && (
                <img src={resolveMediaUrl(formData.logo)} alt="Current university logo" className="mt-3 h-20 w-20 rounded-lg object-contain border border-gray-200 bg-white" />
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Banner Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange('banner_image', e.target.files?.[0])} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white" />
              {formData.banner_image && !(formData.banner_image instanceof File) && (
                <img src={resolveMediaUrl(formData.banner_image)} alt="Current university banner" className="mt-3 h-20 w-36 rounded-lg object-cover border border-gray-200" />
              )}
            </div>
            <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700">
              <input
                type="checkbox"
                name="show_in_listing"
                checked={Boolean(formData.show_in_listing)}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              Show on university page
            </label>
          </div>

          {/* Key Stats */}
          <div className="mb-8 p-4 bg-white border rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800">Key Stats</h4>
              <button type="button" onClick={() => addArrayItem('key_stats', { label: '', value: '' })} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-100">+ Add Stat</button>
            </div>
            {formData.key_stats.map((stat, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <input placeholder="Label (e.g. Acceptance Rate)" value={stat.label} onChange={(e) => handleArrayChange(idx, 'key_stats', 'label', e.target.value)} className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" />
                <input placeholder="Value (e.g. 4%)" value={stat.value} onChange={(e) => handleArrayChange(idx, 'key_stats', 'value', e.target.value)} className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" />
                <button type="button" onClick={() => removeArrayItem(idx, 'key_stats')} className="text-red-500 hover:text-red-700 px-2 font-bold">✕</button>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div className="mb-8 p-4 bg-white border rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800">Facilities</h4>
              <button type="button" onClick={() => addArrayItem('facilities', { facility_name: '' })} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-100">+ Add Facility</button>
            </div>
            {formData.facilities.map((fac, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <input placeholder="Facility Name (e.g. Cutting-edge Labs)" value={fac.facility_name} onChange={(e) => handleArrayChange(idx, 'facilities', 'facility_name', e.target.value)} className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" />
                <button type="button" onClick={() => removeArrayItem(idx, 'facilities')} className="text-red-500 hover:text-red-700 px-2 font-bold">✕</button>
              </div>
            ))}
          </div>

          {/* Popular Courses */}
          <div className="mb-8 p-4 bg-white border rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800">Popular Courses</h4>
              <button type="button" onClick={() => addArrayItem('popular_courses', { name: '', duration: '', fee: '', intake: '' })} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-100">+ Add Course</button>
            </div>
            {formData.popular_courses.map((course, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 p-3 border border-dashed border-gray-300 rounded relative">
                <select
                  value={course.name || ''}
                  onChange={(e) => handleProgramSelect(idx, e.target.value)}
                  className="col-span-1 md:col-span-4 px-3 py-2 rounded border border-gray-300 text-sm font-bold bg-white"
                >
                  <option value="">Select Program</option>
                  {course.name && !programs.some(p => p.name === course.name) && (
                    <option value={course.name}>{course.name}</option>
                  )}
                  {programs.map(program => (
                    <option key={program.slug} value={program.name}>{program.name}</option>
                  ))}
                </select>
                <input placeholder="Duration (e.g. 4 Years)" value={course.duration} onChange={(e) => handleArrayChange(idx, 'popular_courses', 'duration', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                <input placeholder="Fee (e.g. $55,000 / year)" value={course.fee} onChange={(e) => handleArrayChange(idx, 'popular_courses', 'fee', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                <input placeholder="Intake (e.g. Fall)" value={course.intake} onChange={(e) => handleArrayChange(idx, 'popular_courses', 'intake', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                <button type="button" onClick={() => removeArrayItem(idx, 'popular_courses')} className="bg-red-50 text-red-600 rounded text-sm font-bold hover:bg-red-100">Delete Course</button>
              </div>
            ))}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
            {formData.id ? 'Save All Changes' : 'Create Complete University'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">University</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Fee Range</th>
              <th className="p-4 font-semibold">University Page</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {universities.map(uni => (
              <tr key={uni.slug} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-dark-900">{uni.name}</div>
                  <div className="text-xs text-primary-600 font-medium">Rank #{uni.ranking} • {uni.popular_courses?.length || 0} Courses</div>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {uni.location}, <span className="font-bold">{uni.country_name}</span>
                </td>
                <td className="p-4 text-sm text-gray-600">{uni.tuition_fee}</td>
                <td className="p-4 text-sm font-bold">
                  <span className={uni.show_in_listing ? 'text-green-600' : 'text-gray-400'}>
                    {uni.show_in_listing ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => editUniversity(uni)} className="text-primary-600 hover:text-primary-800 font-medium text-sm mr-4 transition-colors">Edit</button>
                  <button onClick={() => deleteUniversity(uni.slug)} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversitiesManager;
