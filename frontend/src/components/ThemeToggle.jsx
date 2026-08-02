import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-[#6366f1] to-[#818cf8] text-white shadow-[0_10px_30px_-10px_#6366f1] hover:scale-110 transition-transform duration-300"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
