import React, { useMemo } from 'react';
import { Baby, Activity, Heart, Moon, ClipboardCheck, Smartphone, BookOpen } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { Link } from 'react-router-dom';

const ICONS = {
  pregnancy: Baby,
  pcos: Activity,
  maternal: Heart,
  prophetic: Moon,
  assessment: ClipboardCheck,
  support: Smartphone,
  guide: BookOpen,
};

function Services() {
  // Memoized services tailored to Areej's specific programs
  const services = useMemo(
    () => [
      {
        icon: ICONS.pregnancy,
        title: "Pregnancy Nutrition Program",
        description:
          "Comprehensive nutritional support for expecting mothers to ensure optimal fetal development and maternal well-being.",
        features: ["Trimester-specific plans", "Fetal growth support", "Nausea & craving mgmt", "Postpartum recovery"],
      },
      {
        icon: ICONS.pcos,
        title: "Women's Health & PCOS",
        description:
          "Targeted hormonal balance through science-backed nutrition that honors your traditional Pakistani food culture.",
        features: ["Insulin sensitivity plans", "Hormonal regulation", "Weight management", "Cycle tracking support"],
      },
      {
        icon: ICONS.maternal,
        title: "Maternal & Child Nutrition",
        description:
          "Expert guidance on breastfeeding nutrition and healthy weaning practices for your infant's first 1000 days.",
        features: ["Lactation support", "First foods (weaning)", "Toddler nutrition", "Anemia prevention"],
      },
      {
        icon: ICONS.prophetic,
        title: "Prophetic Medicine & Tibb",
        description:
          "Integrating the healing wisdom of Sunnah—like Black Seed and Dates—with modern clinical nutritional science.",
        features: ["Sunnah-based foods", "Detoxification", "Digestive health", "Faith-centered healing"],
      },
      {
        icon: ICONS.support,
        title: "1-on-1 Virtual Coaching",
        description:
          "Direct access to Areej via WhatsApp and video calls for constant motivation and plan adjustments.",
        features: ["Weekly WhatsApp check-ins", "Progress monitoring", "Cultural food swaps", "24/7 Q&A access"],
      },
      {
        icon: ICONS.guide,
        title: "Nutrition Guides",
        description:
          "Step-by-step digital resources for managing specific health conditions at home. (Launching Soon)",
        features: ["PCOS Recipe Book", "Pregnancy Checklist", "Islamic Fasting Guide", "Kitchen Makeover"],
        isComingSoon: true, // Tag for placeholder
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16">
      <div className="animated-background" />
      <ParticleBackground />

      {/* HERO SECTION */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-Mg">Programs</span>
          </h1>
          <p className="text-xl text-Dg max-w-3xl mx-auto mb-12 italic">
            "Empowering Pakistani women with faith-centered, culturally rooted, and evidence-based nutrition."
          </p>

          {/* SERVICES GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map(({ icon: Icon, title, description, features, isComingSoon }, index) => (
              <div
                key={index}
                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${isComingSoon ? 'border-2 border-dashed border-Mg/30' : ''}`}
              >
                {isComingSoon && (
                  <div className="absolute top-4 right-[-35px] bg-Mg text-white text-[10px] font-bold py-1 px-10 rotate-45 shadow-md">
                    COMING SOON
                  </div>
                )}
                
                <div className="mb-6 flex justify-center">
                  <Icon className={`w-16 h-16 ${isComingSoon ? 'text-gray-400' : 'text-Mg'}`} />
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>
                <p className="text-gray-600 mb-6 text-center">{description}</p>

                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className={`w-2 h-2 rounded-full mr-3 ${isComingSoon ? 'bg-gray-300' : 'bg-Mg'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 text-center text-Mg shadow-xl border border-white/50">
            <h2 className="text-3xl font-bold mb-6">Currently Accepting Limited Clients</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-Dg">
              Start your journey today with a personalized nutrition plan that honors your body and your faith.
            </p>

            <Link 
              to="/bookconsultation" 
              className="bg-gradient-to-r from-Mg to-Lg text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;