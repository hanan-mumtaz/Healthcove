import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, Clock, ExternalLink, Trash2, 
  Calendar, TrendingUp, Loader2, AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import API from '../services/api';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/appointments/all');
      const data = res.data;

      setAppointments(data.slice(0, 5));

      const total = data.length;
      const pending = data.filter((a: any) => a.status === 'pending').length;
      const completed = data.filter((a: any) => a.status === 'completed').length;

      setStats({ total, pending, completed });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this appointment record?")) {
      try {
        await API.delete(`/appointments/${id}`);
        fetchDashboardData();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Admin <span className="text-Mg">Portal</span>
          </h1>
          <p className="text-xl text-slate-800 opacity-90 leading-relaxed font-medium">
            Welcome back, Areej. Monitor your practice growth and manage patient consultations.
          </p>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatCard icon={Users} label="Total Requests" value={stats.total} color="bg-indigo-500" />
          <StatCard icon={Clock} label="Pending Review" value={stats.pending} color="bg-amber-500" />
          <StatCard icon={CheckCircle} label="Completed" value={stats.completed} color="bg-Mg" />
        </div>

        {/* --- APPOINTMENTS TABLE CARD --- */}
        <div className="bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden">
          <div className="p-8 md:p-10 border-b border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Recent Requests</h2>
              <p className="text-sm text-slate-600 font-semibold italic">Real-time patient booking feed.</p>
            </div>
            <Link 
              to="/admin/appointments"
              className="px-6 py-2.5 bg-gradient-to-r from-Mg to-Lg text-white font-bold rounded-xl hover:shadow-lg shadow-Mg/20 transition-all active:scale-95"
            >
              Manage All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-Mg animate-spin" />
                <p className="mt-4 text-slate-500 font-bold">Syncing Records...</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-Mg/5 text-slate-700 text-[11px] font-black uppercase tracking-[0.2em]">
                    <th className="px-10 py-5">Patient Details</th>
                    <th className="px-10 py-5">Concern</th>
                    <th className="px-10 py-5">Date & Time</th>
                    <th className="px-10 py-5">Status</th>
                    <th className="px-10 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {appointments.length > 0 ? (
                    appointments.map((apt) => (
                      <tr key={apt._id} className="hover:bg-white/40 transition-all group">
                        <td className="px-10 py-6">
                          <div className="font-bold text-slate-900 text-lg">{apt.name}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-tight">{apt.email}</div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-4 py-1.5 bg-violet-100 rounded-full text-[10px] font-black uppercase text-violet-700 border border-violet-200 tracking-tight">
                            {apt.healthIssue}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <Calendar className="w-4 h-4 text-Mg" /> 
                            {new Date(apt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="text-xs text-slate-500 ml-6 font-semibold">{apt.time}</div>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border ${
                            apt.status === 'pending' 
                            ? 'bg-amber-50 text-amber-700 border-amber-200' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            <Link 
                              to="/admin/appointments"
                              className="p-3 bg-white/70 hover:bg-Mg hover:text-white rounded-2xl transition-all shadow-sm border border-white/60"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button 
                              onClick={() => handleDelete(apt._id)}
                              className="p-3 bg-white/70 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm border border-white/60"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 italic font-medium">
                        No recent appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="p-6 bg-white/10 text-center border-t border-white/20">
             <Link to="/admin/appointments" className="text-xs font-black uppercase tracking-widest text-Mg hover:text-slate-900 transition-colors flex items-center justify-center gap-2">
                View Full Patient Database <TrendingUp className="w-3 h-3" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/40 shadow-xl flex items-center gap-6 group hover:border-Mg/30 transition-all transform hover:-translate-y-1">
    <div className={`p-5 rounded-[1.5rem] text-white ${color} shadow-lg transform group-hover:scale-110 transition-transform`}>
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-black text-slate-900">{value}</p>
        <TrendingUp className="w-4 h-4 text-Mg opacity-40" />
      </div>
    </div>
  </div>
);

export default AdminDashboard;