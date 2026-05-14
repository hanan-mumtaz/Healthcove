import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import AuthContext from '../Authenticator/AuthContext';
import { Star, Send, User as UserIcon } from 'lucide-react'; // Added UserIcon
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const loadingAuth = auth?.loading;
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews?t=${Date.now()}`); 
      if (res.data && Array.isArray(res.data)) {
        const approved = res.data.filter((r: any) => r.status === 'approved');
        const sorted = approved.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReviews(sorted);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/reviews', newReview);
      alert("Review submitted! It will appear once approved by Areej.");
      setNewReview({ rating: 5, comment: "" });
      fetchReviews();
    } catch (err) {
      alert("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen max-w-5xl mx-auto px-4 pb-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center text-slate-900">
          Client <span className="text-Lg">Testimonials</span>
        </h1>
      </header>

      {/* --- SECTION 1: SUBMISSION FORM --- */}
      <div className="mb-16">
        {loadingAuth ? (
          <div className="text-center p-12 bg-white/20 backdrop-blur-sm rounded-2xl">
            <div className="w-8 h-8 border-4 border-Mg border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500 font-medium">Verifying session...</p>
          </div>
        ) : user ? (
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center gap-4 mb-6">
               {/* Current User Photo Preview */}
               <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-Mg shadow-sm bg-Mg/10 flex items-center justify-center">
                  {user.picture ? (
                    <img src={user.picture} alt="Me" className="w-full h-full object-cover" referrerPolicy="no-referrer"  crossOrigin="anonymous"/>
                  ) : (
                    <UserIcon className="w-6 h-6 text-Mg" />
                  )}
               </div>
               <div>
                  <h2 className="text-xl font-bold text-Dg">Assalam-o-Alaikum, {user.name || "Sister"}</h2>
                  <p className="text-sm text-gray-500">Share your journey with the community</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star 
                    key={num}
                    className={`w-6 h-6 cursor-pointer transition-colors ${num <= newReview.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    onClick={() => setNewReview({...newReview, rating: num})}
                  />
                ))}
              </div>
              <textarea 
                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-Mg/50 transition-all text-slate-800"
                placeholder="How was your experience with Areej?"
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-Mg text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-Dg transition-all disabled:opacity-50 font-bold shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" /> 
                <span>{loading ? "Submitting..." : "Post Review"}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-100">
            <p className="text-gray-600">
              Please <Link to="/signin" className="text-Mg font-bold hover:underline">Sign In</Link> to leave a review.
            </p>
          </div>
        )}
      </div>

      {/* --- SECTION 2: PUBLIC REVIEWS LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id} className="p-6 bg-white/80 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {/* ✅ PROFILE IMAGE LOGIC ADDED HERE */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-Mg/10 flex items-center justify-center border border-gray-100">
                    {rev.picture ? (
                      <img 
                        src={rev.picture} 
                        alt={rev.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <span className="text-Mg font-bold text-sm">{rev.name?.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-Dg">{rev.name}</h3>
                </div>
                <div className="flex text-yellow-500">
                  {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 italic leading-relaxed mb-4 flex-grow">"{rev.comment}"</p>
              
              <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="text-[9px] bg-Mg/10 text-Mg px-2 py-0.5 rounded-full font-black">
                  VERIFIED HEALTHCOVE STORY
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white/20 rounded-3xl border-2 border-dashed border-white/40">
            <p className="text-gray-500 italic">No approved reviews yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;