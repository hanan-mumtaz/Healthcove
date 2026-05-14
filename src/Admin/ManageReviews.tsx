import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Check, X, Trash2, Search, MessageSquare, Star, Loader2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const ManageReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStatusReviews = async () => {
    try {
      setLoading(true);
      // Using the admin-specific route to get all (including pending)
      const res = await API.get('/reviews/admin/all'); 
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusReviews();
  }, []);

  const handleApprove = async (reviewId: string) => {
    try {
      // Logic: Update status to 'approved'
      await API.patch(`/reviews/${reviewId}`, { status: 'approved' });
      fetchStatusReviews();
    } catch (err) {
      alert("Failed to approve review");
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm("Permanently delete this review?")) {
      try {
        await API.delete(`/reviews/${reviewId}`);
        fetchStatusReviews();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const filteredReviews = reviews.filter(rev => 
    rev.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    rev.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Review <span className="text-Mg">Moderator</span>
          </h1>
          <p className="text-xl text-slate-800 opacity-90 leading-relaxed font-medium">
            Manage your community's feedback. Approved stories will appear on the Home and Testimonials pages.
          </p>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-lg mb-10">
            <div className="relative w-full">
               <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
               <input 
                type="text" 
                placeholder="Search by client name or feedback content..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-transparent border-none outline-none text-slate-900 font-bold" 
               />
            </div>
        </div>

        {/* --- REVIEWS TABLE CARD --- */}
        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-Mg animate-spin" />
              <p className="mt-4 text-slate-500 font-bold">Syncing Feedback...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-Mg/5 text-slate-700 text-[11px] font-black uppercase tracking-[0.2em]">
                    <th className="px-10 py-5">Client</th>
                    <th className="px-10 py-5">Feedback</th>
                    <th className="px-10 py-5">Rating</th>
                    <th className="px-10 py-5">Status</th>
                    <th className="px-10 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((rev) => (
                      <tr key={rev._id} className="hover:bg-white/40 transition-all group">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-Mg/10 border border-white shadow-sm flex items-center justify-center">
                               {rev.picture ? (
                                 <img src={rev.picture} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                               ) : (
                                 <span className="text-Mg font-bold">{rev.name.charAt(0)}</span>
                               )}
                            </div>
                            <div className="font-bold text-slate-900 text-lg">{rev.name}</div>
                          </div>
                        </td>
                        <td className="px-10 py-6 max-w-xs">
                          <p className="text-sm text-slate-600 font-medium italic leading-relaxed line-clamp-2">
                            "{rev.comment}"
                          </p>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex text-yellow-500">
                            {[...Array(Number(rev.rating || 5))].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border ${
                            rev.status === 'pending' 
                            ? 'bg-amber-50 text-amber-700 border-amber-200' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {rev.status}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex justify-end gap-3">
                            {rev.status === 'pending' && (
                              <button 
                                onClick={() => handleApprove(rev._id)}
                                className="p-3 bg-white/50 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all shadow-sm border border-white/60"
                                title="Approve Review"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(rev._id)}
                              className="p-3 bg-white/50 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm border border-white/60"
                              title="Delete Review"
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
                        No reviews found for moderation.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="p-6 bg-white/20 text-center">
             <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-Mg">
                <MessageSquare className="w-4 h-4" />
                Community Voices Matter
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;