import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Image as ImageIcon, Layout, Eye, Search, Filter, X, Loader2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import API from '../services/api';

const AdminBlogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    category: "PCOS Health",
    status: "Draft",
    image: "",
    content: ""
  });

  const inputStyle = "w-full px-5 py-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 text-slate-900 font-medium placeholder-slate-400 focus:ring-2 focus:ring-Mg focus:bg-white/95 transition-all outline-none shadow-sm";

  // --- FETCH DATA ---
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/blogs');
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // --- CREATE / UPDATE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await API.put(`/blogs/${currentId}`, formData);
      } else {
        await API.post('/blogs', formData);
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      alert("Error saving post.");
    }
  };

  // --- DELETE ---
  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this article permanently?")) {
      try {
        await API.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const handleEdit = (post: any) => {
    setIsEditing(true);
    setCurrentId(post._id);
    setFormData({
      title: post.title,
      category: post.category,
      status: post.status,
      image: post.image || "",
      content: post.content || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ title: "", category: "PCOS Health", status: "Draft", image: "", content: "" });
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    // UPDATED: Background to match Violet/Indigo scheme
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Blog <span className="text-Mg">Manager</span>
          </h1>
          <p className="text-xl text-slate-800 opacity-90 leading-relaxed font-medium">
            Create, edit, and curate Areej's health insights for the HealthCove community.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* --- LEFT: FORM (Sticky) --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-Mg/10 rounded-2xl">
                    <Edit3 className="w-6 h-6 text-Mg" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{isEditing ? "Edit Post" : "New Article"}</h2>
                </div>
                {isEditing && (
                  <button onClick={resetForm} className="p-2 hover:bg-red-50 text-red-400 rounded-full transition-all">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Article Title</label>
                  <input 
                    type="text" 
                    placeholder="The Power of Tibb-e-Nabwi..." 
                    className={inputStyle} 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Category</label>
                    <select 
                      className={inputStyle}
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>PCOS Health</option>
                      <option>Pregnancy</option>
                      <option>Sunnah Health</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Status</label>
                    <select 
                      className={inputStyle}
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option>Draft</option>
                      <option>Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Featured Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="https://images.unsplash..." 
                      className={`${inputStyle} pl-12`} 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Content</label>
                  <textarea 
                    rows={6} 
                    placeholder="Start sharing your expertise..." 
                    className={`${inputStyle} resize-none`} 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-Mg to-Lg text-white py-5 rounded-2xl font-bold hover:shadow-xl shadow-Mg/20 transform hover:scale-[1.02] active:scale-95 transition-all">
                  {isEditing ? "Update Insights" : "Publish Insights"}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT: POST LIST --- */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-3xl border border-white/50 shadow-lg flex flex-col md:flex-row gap-4 items-center">
               <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
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
                  <p className="mt-4 text-slate-500 font-bold">Syncing Blog...</p>
                </div>
              ) : filteredPosts.map((post) => (
                <div key={post._id} className={`bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row items-center justify-between group hover:border-Mg/30 ${currentId === post._id ? 'border-Mg border-2 ring-4 ring-Mg/5 shadow-2xl' : 'border-white/40 shadow-xl'}`}>
                  <div className="flex items-center gap-6 w-full">
                    {/* UPDATED: Emerald replaced with Indigo theme */}
                    <div className="hidden md:block w-20 h-20 rounded-2xl bg-indigo-50 flex-shrink-0 overflow-hidden border border-indigo-100">
                       {post.image ? (
                         <img src={post.image} className="w-full h-full object-cover" alt="Blog" />
                       ) : (
                         <Layout className="w-full h-full p-6 text-Mg opacity-40" />
                       )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="px-2.5 py-1 bg-Mg/10 text-Mg text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {post.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${post.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {post.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-Mg transition-colors leading-tight">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
                    <button onClick={() => handleEdit(post)} className="p-3 bg-white/50 hover:bg-white rounded-2xl text-slate-400 hover:text-blue-500 transition-all shadow-sm border border-white/60">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="p-3 bg-white/50 hover:bg-red-50 rounded-2xl text-red-400 hover:text-red-600 transition-all shadow-sm border border-white/60">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-[2rem] bg-Mg text-white shadow-xl shadow-Mg/20 flex items-center justify-between">
               <div>
                  <h4 className="font-bold text-lg">Growth Tip</h4>
                  <p className="text-sm opacity-90">Articles with "Tibb-e-Nabwi" tags get 40% more engagement in Pakistan.</p>
               </div>
               <Layout className="w-12 h-12 opacity-20" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;