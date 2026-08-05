import { useAuth } from '../context/AuthContext.jsx';
import GlassCard from '../components/GlassCard.jsx';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-[#1a1a2e] dark:text-white">Profile</h1>
        <p className="text-sm text-[#777] dark:text-[#999] mt-2">Your account settings and role information.</p>
      </div>
      <GlassCard>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#818cf8] flex items-center justify-center text-white text-2xl font-extrabold shadow-glass">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#1a1a2e] dark:text-white">{user?.username || 'Guest'}</h3>
            <p className="text-xs uppercase tracking-widest text-[#6366f1] font-bold">{user?.role || 'unknown'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10">
            <p className="text-xs text-[#999]">Username</p>
            <p className="font-semibold text-[#1a1a2e] dark:text-white">{user?.username || '-'}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10">
            <p className="text-xs text-[#999]">Role</p>
            <p className="font-semibold text-[#1a1a2e] dark:text-white">{user?.role || '-'}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
