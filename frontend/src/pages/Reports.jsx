import StatsCard from '../components/StatsCard.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { BarChart3, UserCheck, BedDouble } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-[#1a1a2e] dark:text-white">Reports</h1>
        <p className="text-sm text-[#777] dark:text-[#999] mt-2">Daily, student, and room-level analytics.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="#" className="group">
          <GlassCard className="h-full group-hover:-translate-y-1 transition-transform">
            <h3 className="font-bold text-lg mb-2 text-[#1a1a2e] dark:text-white">Daily Report</h3>
            <p className="text-sm text-[#777] dark:text-[#999]">Overview of present/absent students for a specific date.</p>
            <p className="text-xs text-[#999] mt-4">GET /api/reports/daily</p>
          </GlassCard>
        </a>
        <a href="#" className="group">
          <GlassCard className="h-full group-hover:-translate-y-1 transition-transform">
            <h3 className="font-bold text-lg mb-2 text-[#1a1a2e] dark:text-white">Student Report</h3>
            <p className="text-sm text-[#777] dark:text-[#999]">Personal attendance rate and history.</p>
            <p className="text-xs text-[#999] mt-4">GET /api/reports/student?studentId=...</p>
          </GlassCard>
        </a>
        <a href="#" className="group">
          <GlassCard className="h-full group-hover:-translate-y-1 transition-transform">
            <h3 className="font-bold text-lg mb-2 text-[#1a1a2e] dark:text-white">Room Report</h3>
            <p className="text-sm text-[#777] dark:text-[#999]">Attendance aggregated by room.</p>
            <p className="text-xs text-[#999] mt-4">GET /api/reports/room?roomId=...</p>
          </GlassCard>
        </a>
      </div>
    </div>
  );
}
