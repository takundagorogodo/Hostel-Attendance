import { useTheme } from '../context/ThemeContext.jsx';
import { Sun, Moon, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full px-6 md:px-10 py-5 flex items-center justify-between glass-card rounded-none md:rounded-3xl md:mx-6 md:my-4 border-t-0 md:border-t shadow-none md:shadow-glass">
      <h2 className="text-xl font-bold tracking-tight font-display text-[#1a1a2e] dark:text-white hidden md:block">
        {user ? `Welcome, ${user.username}` : 'Hostel Management'}
      </h2>
      <div className="flex items-center gap-3 ml-auto">
        <button onClick={toggle} className="neumorphic-btn rounded-full p-3 w-10 h-10 flex items-center justify-center" aria-label="Toggle theme">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="neumorphic-btn rounded-full p-3 w-10 h-10 flex items-center justify-center relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#e0e5ec] dark:ring-[#16162a]" />
        </button>
        {user && (
          <button onClick={logout} className="hidden sm:inline-flex neumorphic-btn rounded-full px-4 py-2 text-xs font-bold tracking-wide">
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}
