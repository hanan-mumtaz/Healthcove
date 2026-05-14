import React, { useState } from 'react';
import { Calendar, Clock, MessageCircle, Heart, ShieldCheck, ChevronRight, User } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { useAuth } from '../Authenticator/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  // Mock Data for the client's own bookings
  const [myBookings] = useState([
    {
      id: 1,
      healthIssue: "PCOS / Hormonal Balance",
      date: "April 10, 2026",
      time: "10:30 AM",
      status: "scheduled",
      doctorNote: "Please bring your recent blood report for Vitamin D and LH/FSH."
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- WELCOME HEADER --- */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/50 shadow-xl">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-Mg to-Lg flex items-center justify-center text-white shadow-lg border-4 border-white overflow-hidden">
  {user?.picture || user?.photo ? (
    <img 
  src={user.picture} 
  alt="Profile" 
  className="w-full h-full object-cover" 
  // ✅ This is the critical line to bypass the security block
  referrerPolicy="no-referrer" 
  // ✅ This helps with Cross-Origin resource sharing
  crossOrigin="anonymous" 
/>
  ) : (
    <User className="w-12 h-12" />
  )}
</div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">Assalam-o-Alaikum, <span className="text-Mg">{user?.name || user?.displayName || "Sister"}</span></h1>
            <p className="text-slate-600 font-medium mt-1">Track your nutrition journey and upcoming consultations with Areej.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* --- LEFT: QUICK STATS --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-Mg text-white p-8 rounded-[2rem] shadow-xl shadow-Mg/20 relative overflow-hidden group">
              <Heart className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-lg font-bold mb-2">Health Tip of the Day</h3>
              <p className="text-sm opacity-90 leading-relaxed italic">
                "Start your morning with 2 soaked Ajwa dates to boost your iron levels naturally."
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Account Security</h4>
              <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-Mg" />
                Verified Patient Account
              </div>
            </div>
          </div>

          {/* --- RIGHT: BOOKINGS LIST --- */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 px-2 flex items-center justify-between">
              My Appointments
              <span className="text-xs font-black bg-white/50 px-3 py-1 rounded-full text-slate-500 uppercase tracking-tighter shadow-sm">
                {myBookings.length} Session(s)
              </span>
            </h2>

            {myBookings.length > 0 ? (
              myBookings.map((booking) => (
                <div key={booking.id} className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-2xl transition-all hover:translate-y-[-4px]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-Mg/10 text-Mg text-[10px] font-black uppercase tracking-widest rounded-lg border border-Mg/20">
                          {booking.healthIssue}
                        </span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100">
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Nutrition Consultation</h3>
                    </div>
                    
                    <a 
                      href="https://wa.me/923556403625" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-[#25D366] hover:underline"
                    >
                      <MessageCircle className="w-5 h-5" /> Help with this booking
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/50 p-4 rounded-2xl border border-white/40 flex items-center gap-4">
                      <Calendar className="w-6 h-6 text-Mg" />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                        <p className="text-sm font-bold text-slate-800">{booking.date}</p>
                      </div>
                    </div>
                    <div className="bg-white/50 p-4 rounded-2xl border border-white/40 flex items-center gap-4">
                      <Clock className="w-6 h-6 text-Mg" />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                        <p className="text-sm font-bold text-slate-800">{booking.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Areej's Note for the Patient */}
                  {booking.doctorNote && (
                    <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4">
                      <div className="bg-Mg text-white p-2 h-fit rounded-lg shadow-sm">
                        <Heart className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-Mg uppercase tracking-[0.2em] mb-1">Areej's Preparation Note</p>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                          "{booking.doctorNote}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white/30 backdrop-blur-sm p-12 rounded-[2.5rem] border-2 border-dashed border-slate-300 text-center">
                <p className="text-slate-500 font-bold mb-4">You haven't booked any sessions yet.</p>
                <button className="text-Mg font-black uppercase tracking-widest hover:text-slate-900 transition-all flex items-center gap-2 mx-auto">
                  Book First Slot <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;