import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { 
  Apple, Carrot, ChefHat, Clock, Instagram, Linkedin, Mail, 
  MessageCircle, Twitter, Users, Menu, X
} from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Services from './pages/Services';
import BookConsultation from './pages/bookconsultation';
import About from './pages/About';
import Blog from './pages/Blog';
import logo from './logo.png';
import log from './Profile.png';
import ParticleBackground from './pages/ParticleBackground';
import SingleBlog from './pages/SingleBlog';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import SignUp from './pages/signup';
import SignIn from './pages/signin';

import { AuthProvider } from './Authenticator/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContext from "./Authenticator/AuthContext";

/* ------------------------------------------------------------------ */
/*                STATIC MEMOIZED DATA — NO RE-RENDERS                */
/* ------------------------------------------------------------------ */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
const FEATURES = Object.freeze([
  {
    icon: <ChefHat className="w-12 h-12 text-Lg" />,
    title: "Personalized Meal Plans",
    description: "Custom nutrition plans tailored to your lifestyle and goals."
  },
  {
    icon: <Users className="w-12 h-12 text-Lg" />,
    title: "1-on-1 Coaching",
    description: "Direct access to expert nutrition guidance and support."
  },
  {
    icon: <Clock className="w-12 h-12 text-Lg" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance for your nutrition journey."
  }
]);

const TESTIMONIALS = Object.freeze([1, 2, 3]);

/* ------------------------------------------------------------------ */
/*                            MEMOIZED CARDS                          */
/* ------------------------------------------------------------------ */

const FeatureCard = React.memo(({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-sm blur-mobile shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center md:text-left">
    <div className="mb-4 flex justify-center md:justify-start">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
));

const TestimonialCard = React.memo(({ i }) => (
  <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm blur-mobile shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center mb-4">
      <img
        loading="lazy"
        src={`https://i.pravatar.cc/150?img=${i + 1}`}
        alt="Client"
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4">
        <h4 className="font-semibold">Sarah Johnson</h4>
        <p className="text-sm text-gray-500">Lost 20 lbs in 3 months</p>
      </div>
    </div>

    <p className="text-gray-600">
      "The personalized approach and constant support made all the difference in my journey to a healthier lifestyle."
    </p>
  </div>
));

/* ------------------------------------------------------------------ */
/*                         MEMOIZED HOME PAGE                          */
/* ------------------------------------------------------------------ */

const Home = React.memo(function Home() {
  return (
    <>
      <ParticleBackground />

      <section className="relative min-h-screen flex items-center pt-24 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* TEXT */}
            <div className="space-y-6 md:space-y-8 text-center md:text-left">
  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
    Transform Your Life Through
    <span className="bg-gradient-to-r from-Mg to-Lg bg-clip-text text-transparent block md:inline">
      {" "}Healthy Nutrition
    </span>
  </h1>

  <p className="text-lg md:text-xl text-Mg">
    Personalized nutrition plans backed by science. Start your journey to a healthier lifestyle today.
  </p>

  {/* Link to Book Consultation Page */}
  <Link
    to="/bookconsultation"
    className="bg-gradient-to-r from-Mg to-Lg text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full md:w-auto inline-block text-center"
  >
    Book Consultation
  </Link>
</div>


            {/* IMAGE */}
            <div className="relative mt-8 md:mt-0">
              <img
                loading="lazy"
                src={log}
                alt="Healthy Food"
                className="mx-auto md:ml-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-full h-auto"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-20 bg-white/30 backdrop-blur-sm blur-mobile">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Client <span className="text-Lg">Success Stories</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((i) => (
              <TestimonialCard key={i} i={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
});

/* ------------------------------------------------------------------ */
/*                           MAIN APP                                 */
/* ------------------------------------------------------------------ */

function App() {
const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext) || {};

  const handleScroll = useCallback(() => setIsScrolled(window.scrollY > 50), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative overflow-hidden">
            <div className="animated-background" />

            {/* NAVBAR */}
            <nav
              className={`fixed w-full z-50 transition-all duration-300 blur-mobile ${
                isScrolled || isMobileMenuOpen
                  ? 'bg-white/85 backdrop-blur-md'
                  : 'bg-transparent'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  
                  <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <img loading="lazy" src={logo} alt="pic" className="w-30 h-12 object-contain" />
                  </Link>

                  {/* DESKTOP MENU */}
                  <div className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className="text-Dg hover:text-white/55">Home</Link>
                    <Link to="/services" className="text-Dg hover:text-white/55">Services</Link>
                    <Link to="/about" className="text-Dg hover:text-white/55">About</Link>
                    <Link to="/blog" className="text-Dg hover:text-white/55">Blog</Link>
                    <Link to="/contact" className="text-Dg hover:text-white/55">Contact</Link>

                    {user ? (
                      <button onClick={logout} className="text-Dg hover:text-white/55">Logout</button>
                    ) : (
                      <>
                        <Link to="/signup" className="text-Dg hover:text-white/55">Sign Up</Link>
                        <Link to="/signin" className="text-Dg hover:text-white/55">Sign In</Link>
                      </>
                    )}
                  </div>

                  {/* MOBILE MENU */}
                  <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="p-2">
                      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>

                </div>
              </div>

              {/* MOBILE DROPDOWN */}
              {isMobileMenuOpen && (
                <div className="md:hidden bg-white/75 backdrop-blur-xl blur-mobile absolute top-16 left-0 w-full shadow-lg border-t border-gray-100">
                  <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
                    <Link to="/" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Home</Link>
                    <Link to="/services" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Services</Link>
                    <Link to="/about" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">About</Link>
                    <Link to="/blog" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Blog</Link>
                    <Link to="/contact" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Contact</Link>

                    <div className="w-full border-t border-gray-200 my-2"></div>

                    {user ? (
                      <button
                        onClick={() => { logout(); toggleMobileMenu(); }}
                        className="text-lg font-medium text-red-500 hover:text-red-600"
                      >
                        Logout
                      </button>
                    ) : (
                      <div className="flex flex-col space-y-3 w-full items-center">
                        <Link to="/signin" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Sign In</Link>
                        <Link to="/signup" onClick={toggleMobileMenu} className="px-6 py-2 bg-gradient-to-r from-Mg to-Lg text-white rounded-full text-lg w-full text-center">Sign Up</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </nav>

            {/* ROUTES */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/bookconsultation" element={<BookConsultation />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<SingleBlog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>

            {/* FOOTER */}
            <footer className="bg-white/10 text-black py-12 backdrop-blur-sm blur-mobile">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">

                  <div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                      <img loading="lazy" src={logo} alt="pic" className="w-30 h-12 object-contain" />
                    </div>
                    <p>Transform your life through the power of nutrition.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li><Link to="/about" className="hover:text-Lg">About Us</Link></li>
                      <li><Link to="/services" className="hover:text-Lg">Services</Link></li>
                      <li><Link to="/blog" className="hover:text-Lg">Blog</Link></li>
                      <li><Link to="/contact" className="hover:text-Lg">Contact</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <div className="space-y-2 flex flex-col items-center md:items-start">
                      <p className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>contact@Healthcove.com</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>+92 (355) 6403625</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4">
                      {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="hover:text-Lg">
                          <Icon className="w-6 h-6" />
                        </a>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-8 border-t border-Dg text-center">
                  <p>&copy; {new Date().getFullYear()} Healthcove. All rights reserved.</p>
                </div>

              </div>
            </footer>

          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;