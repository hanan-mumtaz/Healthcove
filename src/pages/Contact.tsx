import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

function Contact() {
  const contactInfo = [
    {
    icon: MessageCircle,
    title: "WhatsApp",
    details: ["+92 349 1526911", "Instant Support"],
    action: "Chat Now",
    // This is the direct link to her WhatsApp
    link: "https://wa.me/923491526911", 
    isWhatsApp: true
  },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@healthcove.com", "areej@healthcove.com"],
      action: "Send email",
      link: "mailto:contact@healthcove.com"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["AJK & Islamabad", "Virtual Consultations"],
      action: "Online Only",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 10 AM - 7 PM", "Consultation by Slot"],
      action: "View Availability",
    },
  ];

  const socialLinks = [
    { icon: Instagram, link: "#", color: "hover:text-pink-500" },
    { icon: Linkedin, link: "#", color: "hover:text-blue-600" },
    { icon: Facebook, link: "#", color: "hover:text-blue-500" },
    { icon: Youtube, link: "#", color: "hover:text-red-600" },
  ];

  const faqs = [
    "Do you offer virtual consultations?",
    "Do you provide diet plans for PCOS?",
    "How quickly can I book an appointment?",
    "Is Prophetic Medicine included?",
    "What's your response time?",
  ];

  const faqAnswers = {
    "Do you offer virtual consultations?":
      "Yes! I specialize as a virtual dietitian, offering sessions via Zoom, WhatsApp, or Google Meet.",
    "Do you provide diet plans for PCOS?":
      "Absolutely. I create science-backed plans specifically tailored for hormonal balance and Pakistani lifestyle.",
    "How quickly can I book an appointment?":
      "Slots are limited. Typically, you can find an available slot within 3-5 business days.",
    "Is Prophetic Medicine included?":
      "Yes, I integrate Tibb-e-Nabwi wisdom with modern nutrition based on your health goals.",
    "What's your response time?":
      "I typically respond to WhatsApp messages and emails within 12-24 hours.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16 text-Dg">
      <div className="animated-background" />
      <ParticleBackground />

      {/* WhatsApp Floating Button */}
<a 
  href="https://wa.me/923491526911" 
  target="_blank" 
  rel="noopener noreferrer"
  className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group border-4 border-white/20"
>
  {/* The WhatsApp Icon */}
  <MessageCircle className="w-7 h-7 fill-current" /> 
  
  {/* Hover Label */}
  <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold whitespace-nowrap text-sm">
    WhatsApp Me
  </span>
</a>

      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-Mg bg-gradient-to-r from-Mg to-Lg bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl opacity-90">
              Empowering your health journey through faith and science. Reach out for consultations or queries.
            </p>
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-6 mt-8">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.link} className={`p-3 bg-white/50 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 ${social.color}`}>
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map(({ icon: Icon, title, details, action, link }, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-Mg" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{title}</h3>

                <div className="text-center mb-4">
                  {details.map((detail, i) => (
                    <p key={i} className="text-Dg/80 text-sm font-medium">
                      {detail}
                    </p>
                  ))}
                </div>

                <a 
                  href={link || "#"} 
                  className="block text-center w-full bg-violet-50 text-Mg font-bold py-2 rounded-xl hover:bg-Mg hover:text-white transition-all duration-300"
                >
                  {action}
                </a>
              </div>
            ))}
          </div>

          {/* Contact Form + FAQ */}
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Contact Form */}
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Your Name" />
                  <Input label="Subject" placeholder="e.g. PCOS Inquiry" />
                </div>
                <Input label="Email" type="email" placeholder="email@example.com" />
                <Textarea label="Your Message" placeholder="How can Areej help you?" />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-Mg to-Lg text-white py-4 rounded-2xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* FAQs */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
              <div className="space-y-6">
                {faqs.map((question, index) => (
                  <div key={index} className="group">
                    <h3 className="font-bold text-Mg mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-Mg rounded-full"></div>
                      {question}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed pl-3.5">
                      {faqAnswers[question]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location / Map Section - Updated with Areej's context */}
          <div className="mt-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold mb-2">Serving Globally from AJK</h2>
              <p className="text-gray-700 mb-6 font-medium">Providing virtual care to women across Pakistan, UAE, and the UK.</p>
              <div className="w-full h-[350px] rounded-2xl overflow-hidden shadow-inner grayscale-[50%] hover:grayscale-0 transition-all duration-1000">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5513462551483!2d74.3004391!3d31.4811357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190143e0e996f9%3A0x269666f443918b9b!2sIslamabad!5e0!3m2!1sen!2s!4v1700000000000"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* Reusable Styled Components */
const Input = ({ label, type = "text", placeholder }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3a36] mb-2 ml-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 text-slate-900 font-medium placeholder-slate-500 focus:ring-2 focus:ring-Mg focus:bg-white/90 transition-all outline-none shadow-sm"    />
  </div>
);

const Textarea = ({ label, placeholder }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-[#1e3a36] mb-2 ml-1">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 text-slate-900 font-medium placeholder-slate-500 focus:ring-2 focus:ring-Mg focus:bg-white/90 transition-all outline-none resize-none"
    />
  </div>
);

export default Contact;