import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MessageCircle, Search, Filter, CheckCircle, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import API from '../services/api'; 

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- FETCH REAL DATA FROM BACKEND ---
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await API.get('/appointments/all'); 
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // --- FUNCTION: Update Status (Real API Call) ---
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await API.patch(`/appointments/${id}/status`, { status: newStatus });
      setAppointments(prev => 
        prev.map(apt => apt._id === id ? { ...apt, status: newStatus } : apt)
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  // --- FUNCTION: Delete Appointment (Real API Call) ---
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await API.delete(`/appointments/${id}`);
        setAppointments(prev => prev.filter(apt => apt._id !== id));
      } catch (err) {
        alert("Failed to delete.");
      }
    }
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.healthIssue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Appointment <span className="text-Mg">Manager</span>
          </h1>
          <p className="text-xl text-slate-800 opacity-90 leading-relaxed font-medium">
            Manage consultations and track patient progress in real-time.
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-xl mb-10 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
               <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
               <input 
                type="text" 
                placeholder="Search by patient name or issue..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-transparent border-none outline-none text-slate-900 font-bold" 
               />
            </div>
        </div>

        {/* --- APPOINTMENTS LIST --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-Mg animate-spin" />
            <p className="mt-4 text-slate-600 font-bold tracking-tight">Fetching Appointments...</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredAppointments.map((apt) => (
              <div key={apt._id} className={`bg-white/50 backdrop-blur-md rounded-[2.5rem] border transition-all duration-500 p-8 shadow-2xl ${
                apt.status === 'completed' ? 'border-Mg/30 opacity-75' : 'border-white/60 hover:border-Mg/20'
              }`}>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  
                  {/* PATIENT INFO */}
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-white font-black text-3xl shadow-lg transition-all ${
                      apt.status === 'completed' ? 'bg-slate-400' : 'bg-gradient-to-br from-Mg to-Lg'
                    }`}>
                      {apt.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900">{apt.name}</h3>
                        {apt.status === 'completed' && <CheckCircle className="w-5 h-5 text-Mg" />}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-violet-100 rounded-full text-[10px] font-black uppercase tracking-widest text-violet-600 border border-violet-200">
                           Age: {apt.age}
                        </span>
                        <span className="px-3 py-1 bg-Mg/10 rounded-full text-[10px] font-black uppercase tracking-widest text-Mg border border-Mg/20">
                           {apt.healthIssue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SCHEDULE INFO */}
                  <div className="flex gap-10">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-indigo-400" />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                        <p className="text-sm font-bold text-slate-800">
                          {new Date(apt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-indigo-400" />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                        <p className="text-sm font-bold text-slate-800">{apt.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <a 
                      href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-95"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>

                    {apt.status !== 'completed' ? (
                      <button 
                        onClick={() => handleUpdateStatus(apt._id, 'completed')}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white/70 text-Mg border-2 border-Mg rounded-2xl font-bold hover:bg-Mg hover:text-white transition-all shadow-sm"
                      >
                        <CheckCircle className="w-5 h-5" /> Mark Done
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleUpdateStatus(apt._id, 'pending')}
                        className="flex-1 lg:flex-none px-6 py-3.5 bg-slate-100 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors"
                      >
                        Re-open
                      </button>
                    )}

                    <button 
                      onClick={() => handleDelete(apt._id)}
                      className="p-3.5 bg-white/50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all border border-white/60 shadow-sm"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* MESSAGE BOX */}
                <div className="mt-8 p-6 bg-white/40 rounded-2xl border border-white/60 flex gap-4">
                    <AlertCircle className="w-5 h-5 text-Mg flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Patient Note</p>
                      <p className="text-sm text-slate-700 font-semibold leading-relaxed italic">
                        {apt.message ? `"${apt.message}"` : "No specific message provided."}
                      </p>
                    </div>
                </div>
              </div>
            ))}

            {filteredAppointments.length === 0 && (
              <div className="text-center py-20 bg-white/20 rounded-[2.5rem] border border-dashed border-slate-300">
                 <p className="text-slate-500 font-bold italic">No appointments found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;