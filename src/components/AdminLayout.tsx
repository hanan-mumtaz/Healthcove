import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, FileText, Settings, LogOut, ChevronRight, ExternalLink,Star } from 'lucide-react';
import AuthContext from '../Authenticator/AuthContext';
import logo from '../assets/images/logo.png';

const AdminLayout = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  console.log("Current User Role:", user?.role); 
// 1. ADD THIS LINE to get the logout function from your Context
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { path: '/admin/appointments', icon: CalendarCheck, label: 'Appointments' },
    { path: '/admin/blogs', icon: FileText, label: 'Manage Blogs' },
    { path: '/admin/reviews', icon: Star, label: 'Manage Reviews' },
    { path: '/', icon: ExternalLink, label: 'View Live Site' },

  ];
  

  return (
    // ✅ Change 1: Added h-screen and overflow-hidden to the parent container
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100">
      
      {/* SIDEBAR */}
      {/* ✅ Change 2: Ensure h-full is set so it doesn't shrink */}
      <aside className="w-72 bg-white/40 backdrop-blur-xl border-r border-white/50 hidden lg:flex flex-col h-full z-20">
        <div className="p-6">
  <div className="p-8 pb-10">
    
  <div className="flex flex-col items-start gap-3">
    {/* Clean Logo container */}<Link to="/admin" className="px-4 py-2 block hover:opacity-80 transition-opacity">
    <img 
      loading="lazy" 
      src={logo} 
      alt="HealthCove Logo" 
      className="h-10 w-auto object-contain" 
    /></Link>
    
    {/* Professional Admin Badge */}
    <div className="flex items-center gap-2 px-3 py-1 bg-Mg/10 border border-Mg/20 rounded-full">
      <div className="w-1.5 h-1.5 rounded-full bg-Mg animate-pulse" />
      <span className="text-[10px] px-2 font-black uppercase tracking-[0.15em] text-Mg">
        Admin Portal
      </span>
    </div>
  </div>
</div>
</div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                  ? 'bg-Mg text-white shadow-lg shadow-Mg/20' 
                  : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-Mg'}`} />
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

       <div className="p-4 mt-auto border-t border-white/20 space-y-2">
  {/* 👑 ADMIN PROFILE BUTTON (Above Logout) */}
  <Link 
    to="/admin/profile" 
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
      location.pathname === '/admin/profile' 
      ? 'bg-Mg text-white shadow-lg' 
      : 'text-slate-600 hover:bg-white/60'
    }`}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
      location.pathname === '/admin/profile' ? 'bg-white text-Mg' : 'bg-Mg text-white'
    }`}>
      {user?.name?.charAt(0)}
    </div>
    <div className="flex flex-col overflow-hidden">
      <span className="text-xs font-bold truncate">{user?.name}</span>
      <span className={`text-[10px] ${location.pathname === '/admin/profile' ? 'text-white/80' : 'text-slate-500'}`}>
        Admin Settings
      </span>
    </div>
  </Link>

  {/* LOGOUT BUTTON */}
<button 
  onClick={logout} // ✅ This calls the logout function from your Context
  className="w-full flex items-center gap-3 p-3 text-slate-500 font-bold text-xs hover:text-red-500 transition-colors border-none bg-transparent"
>
  <LogOut className="w-4 h-4" /> 
  <span>Logout to Web</span>
</button>
</div>
      </aside>

      {/* MAIN CONTENT AREA */}
      {/* ✅ Change 3: h-full and overflow-y-auto ensures ONLY this part scrolls */}
      <main className="flex-1 h-full overflow-y-auto relative">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;