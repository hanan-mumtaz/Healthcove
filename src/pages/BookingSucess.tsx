import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, MessageCircle, ArrowRight, Mail } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const BookingSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-24 pb-20 flex items-center justify-center">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-2xl mx-auto px-4 w-full">
        {/* SUCCESS CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 text-center animate-in zoom-in duration-500">
          
          {/* Animated Check Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-Mg rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-Mg to-Lg p-6 rounded-full shadow-lg text-white">
                <CheckCircle className="w-16 h-16 stroke-[3px]" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Booking <span className="text-Mg">Confirmed!</span>
          </h1>
          
          <p className="text-lg text-slate-800 font-medium mb-10 opacity-90 leading-relaxed">
            Alhamdulillah! Your journey to better health has officially started. 
            Areej has received your request and is looking forward to meeting you.
          </p>

          {/* NEXT STEPS BOX */}
          <div className="grid gap-4 mb-10 text-left">
            <div className="bg-white/50 p-5 rounded-2xl border border-white/60 flex items-start gap-4">
              <Mail className="w-6 h-6 text-Mg mt-1" />
              <div>
                <h4 className="font-bold text-slate-900">Check your Email</h4>
                <p className="text-sm text-slate-700">A confirmation link and calendar invite have been sent to your inbox.</p>
              </div>
            </div>

            <div className="bg-[#25D366]/10 p-5 rounded-2xl border border-[#25D366]/20 flex items-start gap-4">
              <MessageCircle className="w-6 h-6 text-[#25D366] mt-1" />
              <div>
                <h4 className="font-bold text-slate-900">Join Support Group</h4>
                <p className="text-sm text-slate-700">Get daily tips and community support while you wait for your session.</p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Back to Home
            </Link>
            <Link 
              to="/blog" 
              className="px-8 py-4 bg-white text-Mg border border-Mg/20 rounded-2xl font-bold hover:bg-Mg hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Read Health Tips <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* BOTTOM NOTE */}
        <p className="mt-8 text-center text-slate-600 text-sm font-medium">
          Need to reschedule? <Link to="/contact" className="text-Mg underline">Contact support</Link>
        </p>
      </div>
    </div>
  );
};

export default memo(BookingSuccess);