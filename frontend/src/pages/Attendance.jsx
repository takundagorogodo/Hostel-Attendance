import GlassCard from '../components/GlassCard.jsx';
import { CheckSquare } from 'lucide-react';

export default function Attendance() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-[#1a1a2e] dark:text-white">Attendance</h1>
        <p className="text-sm text-[#777] dark:text-[#999] mt-2">Mark and manage daily attendance records.</p>
      </div>
      <GlassCard>
        <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-4 flex items-center gap-2"><CheckSquare size={20} /> Mark Today's Attendance</h3>
        <p className="text-sm text-[#777] dark:text-[#999]">Select students and set their status to present or absent. The backend prevents duplicate entries for the same day.</p>
        <div className="mt-6 p-4 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10">
          <p className="text-xs text-[#999]">Connected endpoint: POST /api/attendance/:id</p>
          <p className="text-xs text-[#999]">Status options: present, absent</p>
        </div>
      </GlassCard>
    </div>
  );
}
