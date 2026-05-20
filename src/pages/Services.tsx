import React, { useEffect, useMemo, useState } from 'react';
import { Baby, Activity, Heart, Moon, Smartphone, BookOpen, Sparkles } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { Link } from 'react-router-dom';
import API from '../services/api';

const ICONS = {
  pregnancy: Baby,
  pcos: Activity,
  maternal: Heart,
  prophetic: Moon,
  support: Smartphone,
  guide: BookOpen,
  lifestyle: Sparkles,
};

function Services() {
  const [services, setServices] = useState<any[]>(() => {
    // ✅ Initialize with fallback data for instant render (no loading spinner)
    return [
      {
        iconKey: 'pregnancy',
        title: 'Pregnancy Nutrition Program',
        description: 'Comprehensive nutritional support for expecting mothers to ensure optimal fetal development and maternal well-being.',
        features: ['Trimester-specific plans', 'Fetal growth support', 'Nausea and craving management', 'Postpartum recovery'],
      },
      {
        iconKey: 'pcos',
        title: "Women's Health and PCOS",
        description: 'Targeted hormonal balance through science-backed nutrition that honors your traditional Pakistani food culture.',
        features: ['Insulin sensitivity plans', 'Hormonal regulation', 'Weight management', 'Cycle tracking support'],
      },
      {
        iconKey: 'maternal',
        title: 'Maternal and Child Nutrition',
        description: 'Expert guidance on breastfeeding nutrition and healthy weaning practices for your infant\'s first 1000 days.',
        features: ['Lactation support', 'First foods for weaning', 'Toddler nutrition', 'Anemia prevention'],
      },
      {
        iconKey: 'prophetic',
        title: 'Prophetic Medicine and Tibb',
        description: 'Integrating the healing wisdom of Sunnah, like black seed and dates, with modern clinical nutritional science.',
        features: ['Sunnah-based foods', 'Digestive health', 'Faith-centered healing', 'Lifestyle guidance'],
      },
      {
        iconKey: 'support',
        title: '1-on-1 Virtual Coaching',
        description: 'Direct access to Areej via WhatsApp and video calls for constant motivation and plan adjustments.',
        features: ['Weekly WhatsApp check-ins', 'Progress monitoring', 'Cultural food swaps', 'Follow-up support'],
      },
      {
        iconKey: 'lifestyle',
        title: 'Weight Management and Lifestyle Reset',
        description: 'Practical support for sustainable fat loss, habit building, and long-term routine changes that fit real life.',
        features: ['Personalized meal structure', 'Sustainable fat loss', 'Habit tracking', 'Progress reviews'],
      },
    ];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Fetch API data in the background (non-blocking)
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await API.get('/services?public=true');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch services, using fallback', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const fallbackServices = useMemo(
    () => [],
    []
  );

  const visibleServices = services;

  const resolveIcon = (iconKey: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      pregnancy: ICONS.pregnancy,
      pcos: ICONS.pcos,
      maternal: ICONS.maternal,
      prophetic: ICONS.prophetic,
      support: ICONS.support,
      guide: ICONS.guide,
      lifestyle: ICONS.lifestyle,
    };

    return iconMap[iconKey] || ICONS.lifestyle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16">
      <div className="animated-background" />
      <ParticleBackground />

      {/* HERO SECTION */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-Mg">Programs</span>
          </h1>
          <p className="text-xl text-Dg max-w-3xl mx-auto mb-12 italic">
            "Empowering Pakistani women with faith-centered, culturally rooted, and evidence-based nutrition."
          </p>

          {/* SERVICES GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {visibleServices.map((service, index) => {
              const Icon = resolveIcon(service.iconKey);

              return (
              <Link
                key={service._id || index}
                to={`/services/${service._id || ''}`}
                className="group block bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="mb-6 flex justify-center">
                  <Icon className="w-16 h-16 text-Mg" />
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 rounded-full mr-3 bg-Mg" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center text-sm font-bold text-Mg opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </div>
              </Link>
              );
            })}
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