import React, { useContext, useState } from 'react';
import { User, Mail, Shield, Save, Camera, Loader2 } from 'lucide-react';
import AuthContext from '../Authenticator/AuthContext';
import API from '../services/api'; // Import your API service

const AdminProfile = () => {
  const { user, setUser } = useContext(AuthContext); // Assuming setUser is available in context
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || "Lead Nutritionist at HealthCove. Specialized in PCOS and Pregnancy nutrition."
  });

  // --- Handle Input Changes ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Handle Save Logic ---
  const handleSave = async () => {
    setLoading(true);
    try {
      // Replace with your actual update route (e.g., /users/update-profile)
      const res = await API.put(`/users/profile/${user.id}`, formData);
      
      if (res.data) {
        alert("Profile updated successfully!");
        // Update local context if necessary
        if (setUser) setUser(res.data); 
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">Admin Settings</h1>
        <p className="text-slate-500">Manage your professional practitioner profile</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Profile Picture / Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 text-center shadow-sm">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-Mg/20 flex items-center justify-center text-Mg text-4xl font-black overflow-hidden">
                {user?.picture ? (
                   <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                   user?.name?.charAt(0)
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-Mg text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="font-bold text-xl text-slate-900">{formData.name}</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-Mg/10 text-Mg rounded-full text-[10px] font-black uppercase mt-2">
              <Shield className="w-3 h-3" /> System Admin
            </div>
          </div>
        </div>

        {/* RIGHT: Edit Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-Mg" /> Public Bio & Info
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-Mg outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Professional Bio</label>
                <textarea 
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-Mg outline-none transition-all"
                />
              </div>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-Mg text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-Mg/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;