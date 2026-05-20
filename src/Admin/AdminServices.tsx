import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Edit3, Search, X, Loader2, Layers3 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import API from '../services/api';

const ICON_OPTIONS = [
  { value: 'pregnancy', label: 'Pregnancy' },
  { value: 'pcos', label: 'PCOS' },
  { value: 'maternal', label: 'Maternal' },
  { value: 'prophetic', label: 'Prophetic' },
  { value: 'support', label: 'Support' },
  { value: 'lifestyle', label: 'Lifestyle' },
];

const AdminServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    iconKey: 'pregnancy',
    displayOrder: 1,
    isActive: true,
    features: [] as string[],
  });

  const inputStyle = 'w-full px-5 py-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 text-slate-900 font-medium placeholder-slate-400 focus:ring-2 focus:ring-Mg focus:bg-white/95 transition-all outline-none shadow-sm';

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await API.get('/services');
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch services', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFeatureInput('');
    setFormData({
      title: '',
      slug: '',
      description: '',
      iconKey: 'pregnancy',
      displayOrder: 1,
      isActive: true,
      features: [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, displayOrder: Number(formData.displayOrder) };

      if (isEditing && currentId) {
        await API.put(`/services/${currentId}`, payload);
      } else {
        await API.post('/services', payload);
      }

      resetForm();
      fetchServices();
    } catch (error) {
      alert('Error saving service.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this service permanently?')) {
      try {
        await API.delete(`/services/${id}`);
        fetchServices();
      } catch (error) {
        alert('Delete failed.');
      }
    }
  };

  const handleEdit = (service: any) => {
    setIsEditing(true);
    setCurrentId(service._id);
    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      description: service.description || '',
      iconKey: service.iconKey || 'pregnancy',
      displayOrder: service.displayOrder ?? 1,
      isActive: service.isActive ?? true,
      features: Array.isArray(service.features) ? service.features : [],
    });
    setFeatureInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addFeature = () => {
    const value = featureInput.trim();
    if (!value) return;
    setFormData((current) => ({ ...current, features: [...current.features, value] }));
    setFeatureInput('');
  };

  const removeFeature = (index: number) => {
    setFormData((current) => ({
      ...current,
      features: current.features.filter((_, featureIndex) => featureIndex !== index),
    }));
  };

  const filteredServices = useMemo(
    () => services.filter((service) => service.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [services, searchTerm]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Service <span className="text-Mg">Manager</span>
          </h1>
          <p className="text-xl text-slate-800 opacity-90 leading-relaxed font-medium">
            Create, edit, and manage the service cards shown on the public site.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-Mg/10 rounded-2xl">
                    <Edit3 className="w-6 h-6 text-Mg" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{isEditing ? 'Edit Service' : 'New Service'}</h2>
                </div>
                {isEditing && (
                  <button onClick={resetForm} className="p-2 hover:bg-red-50 text-red-400 rounded-full transition-all">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Title</label>
                  <input
                    type="text"
                    placeholder="Pregnancy Nutrition Program"
                    className={inputStyle}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Slug</label>
                  <input
                    type="text"
                    placeholder="pregnancy-nutrition-program"
                    className={inputStyle}
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Service description"
                    className={`${inputStyle} resize-none`}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Icon</label>
                    <select
                      className={inputStyle}
                      value={formData.iconKey}
                      onChange={(e) => setFormData({ ...formData, iconKey: e.target.value })}
                    >
                      {ICON_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Order</label>
                    <input
                      type="number"
                      min="1"
                      className={inputStyle}
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Features</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add a feature and press Enter"
                      className={inputStyle}
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                    />
                    <button type="button" onClick={addFeature} className="px-4 rounded-2xl bg-Mg text-white font-bold">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <button
                        key={`${feature}-${index}`}
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-1 rounded-full bg-Mg/10 text-Mg text-sm font-medium flex items-center gap-2"
                      >
                        {feature}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-Mg focus:ring-Mg"
                  />
                  Active on public site
                </label>

                <button type="submit" className="w-full bg-gradient-to-r from-Mg to-Lg text-white py-5 rounded-2xl font-bold hover:shadow-xl shadow-Mg/20 transform hover:scale-[1.02] active:scale-95 transition-all">
                  {isEditing ? 'Update Service' : 'Publish Service'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-3xl border border-white/50 shadow-lg flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-transparent border-none outline-none text-slate-900 font-bold"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={resetForm} className="flex items-center gap-2 px-6 py-2.5 bg-Mg text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">
                  <Plus className="w-4 h-4" /> New
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-Mg animate-spin" />
                  <p className="mt-4 text-slate-500 font-bold">Syncing Services...</p>
                </div>
              ) : filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div key={service._id} className={`bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row items-center justify-between group hover:border-Mg/30 ${currentId === service._id ? 'border-Mg border-2 ring-4 ring-Mg/5 shadow-2xl' : 'border-white/40 shadow-xl'}`}>
                    <div className="flex items-center gap-6 w-full">
                      <div className="hidden md:flex w-20 h-20 rounded-2xl bg-indigo-50 flex-shrink-0 items-center justify-center border border-indigo-100 text-Mg font-black text-xl">
                        {service.title?.charAt(0) || 'S'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="px-2.5 py-1 bg-Mg/10 text-Mg text-[10px] font-black uppercase tracking-widest rounded-lg">
                            {service.iconKey}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${service.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {service.isActive ? 'Active' : 'Hidden'}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">Order {service.displayOrder}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-Mg transition-colors leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
                      <button onClick={() => handleEdit(service)} className="p-3 bg-white/50 hover:bg-white rounded-2xl text-slate-400 hover:text-blue-500 transition-all shadow-sm border border-white/60">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(service._id)} className="p-3 bg-white/50 hover:bg-red-50 rounded-2xl text-red-400 hover:text-red-600 transition-all shadow-sm border border-white/60">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 rounded-[2rem] bg-white/40 border border-dashed border-slate-300 text-center text-slate-500 font-medium">
                  No services found.
                </div>
              )}
            </div>

            <div className="p-6 rounded-[2rem] bg-Mg text-white shadow-xl shadow-Mg/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">Services are DB-backed</h4>
                <p className="text-sm opacity-90">Edit these cards here and the public Services page updates automatically.</p>
              </div>
              <Layers3 className="w-12 h-12 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServices;