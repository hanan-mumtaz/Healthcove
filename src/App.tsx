import React, { useEffect, useState, useContext, useCallback } from 'react';
import { 
  Apple, Carrot, ChefHat, Clock, Instagram, Linkedin, Mail, 
  MessageCircle, Twitter, Users, Menu, X, Baby, Activity, Moon, 
  User as UserIcon, Star 
} from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

import Services from './pages/Services';
import BookConsultation from './pages/BookConsultation';
import About from './pages/About';
import Blog from './pages/Blog';
import logo from './assets/images/logo.png';
import log from './assets/images/Profile.png';
import ParticleBackground from './components/ParticleBackground';
import SingleBlog from './pages/SingleBlog';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AdminLayout from './components/AdminLayout';
import AdminBlogs from './Admin/AdminBlog';
import AdminDashboard from './Admin/AdminDashboard';
import AdminAppointments from './Admin/AdminAppointments';
import { AuthProvider, useAuth } from './Authenticator/AuthContext'; // Updated import
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContext from "./Authenticator/AuthContext";
import AuthSuccess from './pages/AuthSuccess';
import Calculators from './pages/Calculators';
import BookingSuccess from './pages/BookingSucess'; 
import Profile from './pages/MyProfile';
import ReviewsPage from './pages/ReviewsPage';
import API from './services/api';
import AdminProfile from './Admin/AdminProfile';
import ManageReviews from './Admin/ManageReviews';

/* --- SCROLL TO TOP HELPER --- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const FEATURES = Object.freeze([
  {
    icon: <Baby className="w-12 h-12 text-Lg" />,
    title: "Pregnancy Nutrition",
    description: "Maternal & child nutrition plans for a healthy start in life."
  },
  {
    icon: <Activity className="w-12 h-12 text-Lg" />,
    title: "PCOS & Women's Health",
    description: "Hormonal balance plans designed specifically for Pakistani women."
  },
  {
    icon: <Moon className="w-12 h-12 text-Lg" />,
    title: "Prophetic Medicine",
    description: "Sunnah-based healing integrated with modern nutritional science."
  }
]);

const FeatureCard = React.memo(({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-sm blur-mobile shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center md:text-left">
    <div className="mb-4 flex justify-center md:justify-start">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-slate-900">{description}</p>
  </div>
));

/* --- HOME PAGE --- */
const Home = React.memo(function Home() {
const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchHomeReviews = async () => {
      try {
        const res = await API.get('/reviews');
        // Filter approved reviews and show up to 6
        const approved = res.data.filter((r: any) => r.status === 'approved');
        setReviews(approved.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchHomeReviews();
  }, []);

  return (
    <>
      <ParticleBackground />
      <section className="relative min-h-screen flex items-center pt-24 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:space-y-8 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Areej | Empowering 
                <span className="bg-gradient-to-r from-Mg to-Lg bg-clip-text text-transparent block md:inline">
                  {" "}Pakistani Women
                </span>
                {" "}Through Nutrition
              </h1>
              <p className="text-lg md:text-xl text-Mg font-medium">
                Specialized in Pregnancy, PCOS, and Prophetic Medicine. Start your journey to a healthier lifestyle today.
              </p>
              <Link
                to="/bookconsultation"
                className="bg-gradient-to-r from-Mg to-Lg text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full md:w-auto inline-block text-center"
              >
                Book Consultation
              </Link>
            </div>
            <div className="relative mt-8 md:mt-0">
              <img
                loading="lazy"
                src={log}
                alt="Areej Nutritionist"
                className="mx-auto md:ml-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/30 backdrop-blur-sm blur-mobile">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Client <span className="text-Lg">Success Stories</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.length > 0 ? (
        reviews.map((rev: any) => (
          <div key={rev._id} className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              {/* Profile Image with fallback to Initial */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-Mg/20 flex items-center justify-center text-Mg font-bold border border-white">
                {rev.picture ? (
                  <img 
                    src={rev.picture} 
                    alt={rev.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <span>{rev.name?.charAt(0)}</span>
                )}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">{rev.name}</h4>
                <div className="flex text-yellow-500">
                  {[...Array(Number(rev.rating || 5))].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"{rev.comment}"</p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-slate-900 italic">Be the first to share your journey!</p>
      )}
    </div>
    <div className="text-center mt-12">
      <Link to="/reviews" className="text-Mg font-semibold hover:underline">
        View all testimonials →
      </Link>
    </div>
  </div>
</section>
    </>
  );
});

/* --- NAVIGATION --- */
const Navigation = ({ isScrolled, isMobileMenuOpen, toggleMobileMenu, setIsMobileMenuOpen }) => {
  const { user, logout, loading } = useAuth();
  
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 blur-mobile ${
        isScrolled || isMobileMenuOpen ? 'bg-white/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
            <img loading="lazy" src={logo} alt="HealthCove Logo" className="w-30 h-12 object-contain" />
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-Dg hover:text-Mg font-medium transition-colors">Home</Link>
            <Link to="/services" className="text-Dg hover:text-Mg font-medium transition-colors">Services</Link>
            <Link to="/about" className="text-Dg hover:text-Mg font-medium transition-colors">About</Link>
            <Link to="/blog" className="text-Dg hover:text-Mg font-medium transition-colors">Blog</Link>
            <Link to="/contact" className="text-Dg hover:text-Mg font-medium transition-colors">Contact</Link>
            <Link to="/calculators" className="text-Dg hover:text-Mg font-medium transition-colors">Calculators</Link>
            
            {loading ? (
              <div className="w-20 h-8 bg-gray-200/50 animate-pulse rounded-full"></div>
            ) : user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <Link to="/admin" className="text-Dg hover:text-Mg font-medium transition-colors">Dashboard</Link>
                    <button onClick={logout} className="px-5 py-2 bg-Mg text-white rounded-full hover:bg-Dg transition-colors shadow-md">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/profile" className="flex items-center text-Dg hover:text-Mg font-medium transition-colors">
                       <UserIcon className="w-5 h-5 mr-1" />
                       <span>My Profile</span>
                    </Link>
                    <button onClick={logout} className="px-5 py-2 bg-Mg text-white rounded-full hover:bg-Dg transition-colors shadow-md">
                      Logout
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/signup" className="text-Dg hover:text-Mg font-medium">Sign Up</Link>
                <Link to="/signin" className="px-5 py-2 bg-Mg text-white rounded-full hover:bg-Dg transition-colors shadow-md">
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6 text-Dg" /> : <Menu className="w-6 h-6 text-Dg" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl blur-mobile absolute top-16 left-0 w-full shadow-lg border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
            {/* Mobile Links */}
            <Link to="/" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Home</Link>
            <Link to="/services" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Services</Link>
            <Link to="/about" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">About</Link>
            <Link to="/blog" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Blog</Link>
            <Link to="/contact" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Contact</Link>
            <Link to="/calculators" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg hover:text-Mg">Calculators</Link>
            <div className="w-full border-t border-gray-200 my-2"></div>
            {user ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                {user.role === 'admin' ? (
                  <>
                    <Link to="/admin" onClick={toggleMobileMenu} className="text-lg font-bold text-Mg">Admin Dashboard</Link>
                    <button onClick={() => { logout(); toggleMobileMenu(); }} className="text-lg font-medium text-red-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/profile" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg">My Profile</Link>
                    <button onClick={() => { logout(); toggleMobileMenu(); }} className="text-lg font-medium text-red-500">
                      Logout
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-3 w-full items-center">
                <Link to="/signin" onClick={toggleMobileMenu} className="text-lg font-medium text-Dg">Sign In</Link>
                <Link to="/signup" onClick={toggleMobileMenu} className="px-6 py-2 bg-gradient-to-r from-Mg to-Lg text-white rounded-full text-lg w-full text-center">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

/* --- MAIN APP --- */
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <AppContent 
            isScrolled={isScrolled}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

const AppContent = ({ isScrolled, isMobileMenuOpen, toggleMobileMenu, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const { user, loading } = useAuth(); // Hook instead of Consumer
  const isAdminPath = location.pathname.startsWith('/admin');

  // ✅ AUTH GUARD: Prevent redirecting to Sign In while verifying session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50">
        <div className="w-12 h-12 border-4 border-Mg border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative overflow-hidden">
      <div className="animated-background" />

      {!isAdminPath && (
        <Navigation 
          isScrolled={isScrolled} 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
      )}

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
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        
        <Route path="/admin" element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="reviews" element={<ManageReviews />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAdminPath && (
        <footer className="bg-white/10 text-slate-900 py-16 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start text-left">
              {/* Footer columns... (maintained design) */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center -mt-2 h-10"> 
                  <img loading="lazy" src={logo} alt="HealthCove" className="w-40 h-auto object-contain object-left" />
                </div>
                <p className="text-sm leading-relaxed max-w-[240px]">
                  Empowering Pakistani women through science-backed and Sunnah-inspired nutrition.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold mb-6 text-Dg tracking-tight">Quick Links</h3>
                <ul className="space-y-3 text-sm font-medium text-Dg">
                  <li><Link to="/about" className="hover:text-Mg">About Us</Link></li>
                  <li><Link to="/services" className="hover:text-Mg">Services</Link></li>
                  <li><Link to="/blog" className="hover:text-Mg">Blog</Link></li>
                  <li><Link to="/contact" className="hover:text-Mg">Contact</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold mb-6 text-Dg tracking-tight">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <a href="mailto:contact@healthcove.com" className="flex items-center space-x-3 group">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-Mg group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="group-hover:text-Mg">contact@healthcove.com</span>
                  </a>
                  <a href="https://wa.me/923556403625" className="flex items-center space-x-3 group">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-Mg group-hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="group-hover:text-Mg">+92 355 6403625</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold mb-6 text-Dg tracking-tight">Newsletter</h3>
                <p className="text-sm text-slate-900 mb-5">Join 500+ women for weekly health tips.</p>
                <div className="flex flex-col space-y-3">
  <input 
    type="email" 
    placeholder="Email Address" 
    className="w-full p-3 bg-white/40 rounded-xl text-sm border focus:ring-2 focus:ring-Mg text-slate-900 outline-none shadow-inner placeholder-slate-700" 
  />
  <button className="bg-Mg text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-slate-900 shadow-lg transition-all active:scale-95">
    Subscribe Now
  </button>
</div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
              <p>&copy;{new Date().getFullYear()} HealthCove. Empowering Pakistani Women Through Nutrition.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;