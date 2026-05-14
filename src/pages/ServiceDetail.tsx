import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Baby,
  Activity,
  Check,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Clock,
  MessageCircle
} from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";

/* ───────── UI COMPONENTS ───────── */

const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl ${className}`}>
    {children}
  </div>
);

const PricingCard = ({ plan }) => (
  <div className={`relative p-8 rounded-3xl backdrop-blur-md transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full ${
    plan.featured 
    ? 'bg-white/90 border-2 border-Mg shadow-2xl scale-105 z-10' 
    : 'bg-white/60 border border-white/40 shadow-xl'
  }`}>
    {plan.featured && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-Mg to-Lg text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
        Most Popular
      </span>
    )}
    <h3 className="text-xl font-bold mb-2 text-slate-900">{plan.name}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-3xl font-black text-Mg">{plan.price}</span>
      <span className="text-sm text-slate-500 font-medium">/session</span>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-Lg flex-shrink-0 mt-0.5" />
          <span className="text-sm text-[#1e3a36] font-medium leading-tight">{feature}</span>
        </li>
      ))}
    </ul>
    <Link 
      to="/bookconsultation"
      className={`w-full py-4 rounded-2xl font-bold transition-all text-center ${
        plan.featured 
        ? 'bg-gradient-to-r from-Mg to-Lg text-white shadow-lg hover:shadow-Mg/30' 
        : 'bg-white text-Mg border border-Mg/20 hover:bg-Mg hover:text-white'
      }`}
    >
      Book This Slot
    </Link>
  </div>
);

/* ───────── MAIN PAGE ───────── */

function ServiceDetail() {
  const { id } = useParams();

  // Content is dynamic based on ID, but defaulted to PCOS/Women's health for this example
  const service = useMemo(() => ({
    icon: <Activity className="w-20 h-20 text-Mg" />,
    title: "PCOS & Hormonal Balance",
    description: "Reclaim your health through a clinical approach to PCOS management that respects your food culture and spiritual values. We focus on insulin sensitivity and hormonal regulation naturally.",
    image: "https://images.unsplash.com/photo-1511688858344-1855dd36172f?auto=format&fit=crop&q=80&w=2000",
    
    benefits: [
      "Improve Insulin Sensitivity naturally",
      "Regularize your menstrual cycles",
      "Sustainable weight management without starvation",
      "Reduction in Hirsutism and Acne symptoms",
      "Personalized supplement guidance",
      "Faith-centered motivation (Tawakkul-based healing)"
    ],

    includes: [
      "60-min Initial Comprehensive Assessment",
      "Customized 7-Day Pakistani Meal Plan",
      "WhatsApp Support for 4 Weeks",
      "PCOS-friendly Grocery Shopping Guide",
      "Lifestyle & Sleep Optimization Plan",
      "Bi-weekly Progress Reviews"
    ],

    pricing: [
      {
        name: "Quick Consult",
        price: "Rs. 2,500",
        features: ["One-time assessment", "PCOS analysis", "Basic supplement advice", "7-day diet outline"]
      },
      {
        name: "Healing Journey",
        price: "Rs. 7,000",
        featured: true,
        features: ["3 Extended Consultations", "Full personalized diet plan", "24/7 WhatsApp support", "Lab report analysis", "Cycle tracking help"]
      },
      {
        name: "Premium Care",
        price: "Rs. 12,000",
        features: ["8 Weekly check-ins", "Grocery shopping assistance", "Family meal adjustments", "Sunnah-based detox plan", "Priority WhatsApp access"]
      }
    ],

    faqs: [
      {
        question: "Can PCOS really be managed through diet alone?",
        answer: "Yes, nutrition is the first line of defense for PCOS. By managing insulin levels through low-GI, culturally relevant foods, we can significantly reduce symptoms."
      },
      {
        question: "Do I have to stop eating roti or rice?",
        answer: "Absolutely not! I believe in honoring our food culture. We simply learn how to balance our plates and choose the right portions and combinations."
      }
    ]
  }), []);

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
            <div className="bg-white/50 w-fit p-4 rounded-3xl shadow-inner border border-white/40">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1]">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-[#1e3a36] font-medium leading-relaxed opacity-90">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full border border-white/50 text-xs font-bold text-slate-600">
                  <Clock className="w-4 h-4 text-Mg" /> 4-12 Weeks Program
               </div>
               <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-full border border-white/50 text-xs font-bold text-slate-600">
                  <MessageCircle className="w-4 h-4 text-Mg" /> WhatsApp Support
               </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-Mg to-Lg rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img src={service.image} alt={service.title} className="relative rounded-[2.5rem] shadow-2xl border-4 border-white/50 object-cover w-full h-[500px]" />
          </div>
        </div>

        {/* Features Split */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          <SectionCard>
            <h2 className="text-2xl font-black mb-8 text-slate-900 border-b border-Mg/10 pb-4">Key Benefits</h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, i) => (
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
            <h2 className="text-2xl font-black mb-8 text-slate-900 border-b border-Mg/10 pb-4">What's Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.includes.map((item, i) => (
                <div key={i} className="bg-white/50 p-4 rounded-2xl border border-white/50 flex items-center gap-3">
                  <div className="w-2 h-2 bg-Mg rounded-full"></div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Pricing */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-slate-900">Program Investment</h2>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {service.pricing.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* FAQ Area */}
        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-black mb-10 text-center text-slate-900">Common Concerns</h2>
           <div className="space-y-6">
              {service.faqs.map((faq, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/50">
                  <h3 className="text-xl font-bold mb-3 text-Mg">{faq.question}</h3>
                  <p className="text-[#1e3a36] font-medium leading-relaxed">{faq.answer}</p>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}

export default ServiceDetail;