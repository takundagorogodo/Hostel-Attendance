import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, BarChart3, BedDouble, UserCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Attendance', path: '/attendance', icon: CheckSquare },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Students', path: '/students', icon: Users },
  { label: 'Rooms', path: '/rooms', icon: BedDouble },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { pathname } = useLocation();

  const links = (
    <nav className="flex flex-col gap-2 mt-8">
      {navItems.map((item) => {
        const active = pathname === item.path;
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-300
              ${active
                ? 'bg-white/20 dark:bg-white/10 text-[#1a1a2e] dark:text-white shadow-glass backdrop-blur-lg border border-white/20'
                : 'text-[#444] dark:text-[#ccc] hover:bg-white/10 dark:hover:bg-white/5 hover:text-[#1a1a2e] dark:hover:text-white'
              }`}
          >
            <Icon size={20} strokeWidth={2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <Link
        to="/profile"
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-300
          ${pathname === '/profile' ? 'bg-white/20 dark:bg-white/10 text-[#1a1a2e] dark:text-white shadow-glass backdrop-blur-lg border border-white/20' : 'text-[#444] dark:text-[#ccc] hover:bg-white/10 dark:hover:bg-white/5'}`}
      >
        <UserCircle size={20} strokeWidth={2} />
        <span>Profile</span>
      </Link>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-5 left-5 z-50 p-3 rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-glass"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 h-screen sticky top-0 px-5 py-8 bg-white/10 dark:bg-[#0f0f1a]/40 backdrop-blur-2xl border-r border-white/20 dark:border-white/5 shadow-[inset_-20px_0_40px_-20px_rgba(0,0,0,0.05)] dark:shadow-[inset_-20px_0_40px_-20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#818cf8] flex items-center justify-center shadow-glass">
            <span className="text-white font-extrabold text-lg">H</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#1a1a2e] dark:text-white font-display">Hostel Pro</h1>
        </div>
        <p className="text-xs text-[#777] dark:text-[#999] mb-8">Attendance & Management</p>
        {links}
        {user && (
          <div className="mt-auto pt-6 border-t border-white/20 dark:border-white/10">
            <div className="glass-card px-4 py-3 rounded-2xl">
              <p className="text-xs text-[#777] dark:text-[#999]">Logged in as</p>
              <p className="font-semibold text-sm text-[#1a1a2e] dark:text-white">{user.username}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#6366f1] font-bold">{user.role}</p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}
      <aside className={`md:hidden fixed top-0 left-0 z-40 w-72 h-screen bg-[#f0f8ff]/90 dark:bg-[#0f0f1a]/90 backdrop-blur-2xl border-r border-white/20 shadow-glass transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 p-6 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#818cf8] flex items-center justify-center shadow-glass">
            <span className="text-white font-extrabold text-lg">H</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight font-display">Hostel Pro</h1>
        </div>
        {links}
      </aside>
    </>
  );
}
