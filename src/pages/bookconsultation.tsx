import React, { useState } from "react";
import { Mail, MessageCircle, AlertCircle } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; // 🆕 Import useNavigate
import ParticleBackground from "../components/ParticleBackground";
import { useAuth } from "../Authenticator/AuthContext"; 
import API from "../services/api"; 

const BookConsultation = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate(); // 🆕 Initialize navigate
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    age: "", 
    healthIssue: "", 
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/appointments/book", {
        ...formData,
        userId: user?.id, 
      });

      // 🆕 Success: Redirect to the celebration page
      navigate('/booking-success'); 

    } catch (err) {
      alert("Failed to book. Check your connection.");
    }
  };

  // Consistent High-Contrast Glassmorphism style
  const inputStyle = "w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 text-slate-900 font-medium placeholder-slate-500 focus:ring-2 focus:ring-Mg focus:bg-white/95 transition-all outline-none shadow-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-16">
      <div className="animated-background" />
      <ParticleBackground />

      {/* HEADER */}
      <section className="relative pt-20 pb-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900">
          Book a <span className="text-Mg bg-gradient-to-r from-Mg to-Lg bg-clip-text text-transparent">Consultation</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-800 font-medium max-w-2xl opacity-90">
          Empowering Pakistani Women Through Nutrition. Currently accepting limited clients — book your slot now.
        </p>
        
        <div className="mt-6 bg-white/50 backdrop-blur-sm border border-Mg/20 p-3 rounded-xl flex items-center gap-2 text-sm text-Mg font-bold italic shadow-sm">
            <AlertCircle className="w-4 h-4" />
            "Currently accepting limited clients — book your slot now"
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (WhatsApp)"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Your Age"
                value={formData.age}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              
              <select
                name="healthIssue"
                value={formData.healthIssue}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select Health Issue</option>
                <option value="Pregnancy Nutrition">Pregnancy Nutrition</option>
                <option value="PCOS / Hormonal Balance">PCOS</option>
                <option value="Women's Health">Women's Health</option>
                <option value="Maternal & Child Nutrition">Maternal & Child Nutrition</option>
                <option value="Prophetic Medicine">Prophetic Medicine</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Preferred Slot</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            <textarea
              name="message"
              placeholder="Additional Notes or Specific Goals"
              value={formData.message}
              onChange={handleChange}
              className={`${inputStyle} h-32 resize-none`}
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-Mg to-Lg text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-xl shadow-Mg/20 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 w-full"
            >
              Confirm Booking Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookConsultation;