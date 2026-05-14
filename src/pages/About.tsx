import React, { memo } from "react";
import { Award, BookOpen, Users, Heart, Star, graduationCap } from "lucide-react";
import n from "../assets/images/Profile.png";
import ParticleBackground from "../components/ParticleBackground";

/* ───────── UPDATED STATS FOR AREEJ ───────── */

const STATS = [
  { id: "clients", icon: Users, value: "100+", label: "Lives Touched" },
  { id: "edu", icon: Award, value: "BS (HND)", label: "In Progress" },
  { id: "focus", icon: Heart, value: "100%", label: "Faith-Centered" },
  { id: "region", icon: Star, value: "AJK", label: "First Virtual RD" },
];

/* ───────── OPTIMIZED COMPONENT ───────── */

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16">
      <div className="animated-background" />
      <ParticleBackground />

      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section - Areej's Introduction */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-Mg to-Lg rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src={n} 
                alt="Areej - Student Dietitian" 
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-white/50"
              />
            </div>
            
            <div className="space-y-6">
              <h4 className="text-Mg font-bold tracking-widest uppercase text-sm">Virtual Dietitian From AJK, Pakistan</h4>
              <h1 className="text-4xl md:text-5xl font-bold text-Dg leading-tight">
                I am <span className="text-Mg">Areej</span>
              </h1>
              <p className="text-lg text-Dg leading-relaxed">
                A passionate <strong>Student Dietitian</strong> and <strong>Women's Health Specialist</strong> dedicated to transforming lives through faith-centered, culturally rooted, and evidence-based nutrition. Currently pursuing my BS in Human Nutrition & Dietetics, I am on a mission to make quality nutrition accessible to every Pakistani woman.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {STATS.map(({ id, icon: Icon, value, label }) => (
              <div
                key={id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/50"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-Mg" />
                </div>
                <div className="text-2xl font-bold mb-2 text-Dg">{value}</div>
                <div className="text-gray-700 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Deep Bio & Mission */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-1 bg-Mg rounded-full"></span>
                Inspired by Faith
              </h2>
              <p className="text-lg text-Dg leading-relaxed">
                I am deeply inspired by the healing wisdom Allah ﷻ has gifted us — from the blessed black seed our Prophet ﷺ called <em>"a cure for everything except death,"</em> to the dates that nourished Maryam عليها السلام. I weave Prophetic Medicine into every plan I create because when the Quran and science speak the same truth, that is where real healing begins.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-1 bg-Mg rounded-full"></span>
                My Focus
              </h2>
              <p className="text-lg text-Dg leading-relaxed">
                My focus is to address your unique health concerns — whether it is PCOS, pregnancy nutrition, fatty liver, hormonal imbalance, weight management, high cholesterol, anemia, or hypertension. I'll honor your food culture and ensure you feel supported at every step of your wellness journey.
              </p>
            </div>
          </div>

          {/* Specializations & Closing */}
          <div className="bg-gradient-to-r from-Mg to-Lg rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-8 italic">"Together, with knowledge, nourishment, and tawakkul, we will create a path that fits your life and helps you truly thrive."</h2>
                  <p className="text-white/90 text-lg">
                    Whether you are here to book a consultation, explore my programs, or simply gain insights into practical health tips, I am thrilled to have you here.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-xl font-bold mb-6 border-b border-white/30 pb-2">Specializations</h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {[
                      "Pregnancy & Maternal Nutrition",
                      "Infant & Child Nutrition",
                      "PCOS Management",
                      "Fatty Liver & Hypertension",
                      "Anemia & Iron Deficiency",
                      "Tib-e-Nabwi Nutrition",
                      "Weight Management"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default memo(About);