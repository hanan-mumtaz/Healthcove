import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Baby,
  Activity,
  Check,
  ArrowLeft,
  ShieldCheck,
  Clock,
  MessageCircle
} from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";
import API from "../services/api";

/* ───────── UI COMPONENTS ───────── */

const SectionCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl ${className}`}>
    {children}
  </div>
);

const ICONS: Record<string, React.ReactNode> = {
  pregnancy: <Baby className="w-20 h-20 text-Mg" />,
  pcos: <Activity className="w-20 h-20 text-Mg" />,
  maternal: <Baby className="w-20 h-20 text-Mg" />,
  prophetic: <Activity className="w-20 h-20 text-Mg" />,
  support: <MessageCircle className="w-20 h-20 text-Mg" />,
  lifestyle: <ShieldCheck className="w-20 h-20 text-Mg" />,
};

/* ───────── MAIN PAGE ───────── */

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      if (!id) {
        setError('Missing service identifier.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await API.get(`/services/${id}?public=true`);
        setService(res.data);
      } catch (fetchError) {
        console.error('Failed to fetch service', fetchError);
        setError('This service could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const featureGroups = useMemo(() => service?.features || [], [service]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-24 pb-20 flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-slate-700 font-medium">Loading service...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-24 pb-20 flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 max-w-xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Service unavailable</h1>
          <p className="text-slate-600 mb-8">{error || 'The requested service could not be found.'}</p>
          <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-Mg to-Lg text-white font-bold">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  const icon = ICONS[service.iconKey] || <Activity className="w-20 h-20 text-Mg" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 relative pt-24 pb-20">
      <div className="animated-background" />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <Link to="/services" className="inline-flex items-center text-Mg font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Programs
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div className="bg-white/50 w-fit p-4 rounded-3xl shadow-inner border border-white/40">{icon}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1]">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-[#1e3a36] font-medium leading-relaxed opacity-90">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full border border-white/50 text-xs font-bold text-slate-600">
                  <Clock className="w-4 h-4 text-Mg" /> Program details
               </div>
               <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full border border-white/50 text-xs font-bold text-slate-600">
                  <MessageCircle className="w-4 h-4 text-Mg" /> WhatsApp Support
               </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-Mg to-Lg rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative rounded-[2.5rem] shadow-2xl border-4 border-white/50 bg-white/60 backdrop-blur-md w-full h-[500px] flex items-center justify-center p-10 text-center">
              <div>
                <div className="text-6xl font-black text-Mg mb-4">{featureGroups.length}</div>
                <p className="text-slate-700 font-medium mb-3">service highlights available</p>
                <p className="text-sm text-slate-500">Use the admin panel to update the service details at any time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Split */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          <SectionCard>
            <h2 className="text-2xl font-black mb-8 text-slate-900 border-b border-Mg/10 pb-4">Key Benefits</h2>
            <div className="space-y-4">
              {featureGroups.map((benefit: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-Mg/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-Mg" />
                  </div>
                  <span className="text-slate-700 font-semibold">{benefit}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard className="bg-gradient-to-br from-white/90 to-emerald-50/50">
            <h2 className="text-2xl font-black mb-8 text-slate-900 border-b border-Mg/10 pb-4">What You Get</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureGroups.map((item: string, i: number) => (
                <div key={i} className="bg-white/50 p-4 rounded-2xl border border-white/50 flex items-center gap-3">
                  <div className="w-2 h-2 bg-Mg rounded-full"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="max-w-3xl mx-auto text-center bg-white/50 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/50 shadow-xl">
          <h2 className="text-3xl font-black mb-4 text-slate-900">Ready to book?</h2>
          <p className="text-[#1e3a36] font-medium mb-8">This service is stored in MongoDB and can be edited from the admin panel.</p>
          <Link to="/bookconsultation" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-Mg to-Lg text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Book This Slot
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ServiceDetail;