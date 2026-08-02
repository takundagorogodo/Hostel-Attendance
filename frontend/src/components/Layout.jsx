import { Outlet } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f0f8ff] dark:bg-[#0f0f1a] transition-colors duration-300">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-overlay opacity-20 dark:opacity-10 z-0 pointer-events-none" />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <ThemeToggle />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 px-6 py-8 md:px-10 md:py-10 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
