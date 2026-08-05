import StatsCard from '../components/StatsCard.jsx';
import { Users, CheckSquare, BedDouble, TrendingUp } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-[#1a1a2e] dark:text-white">Dashboard</h1>
        <p className="text-sm text-[#777] dark:text-[#999] mt-2">Overview of hostel attendance, students, and rooms.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Students" value="128" subtitle="+12 this month" icon={Users} />
        <StatsCard title="Present Today" value="94" subtitle="73.4% attendance" icon={CheckSquare} />
        <StatsCard title="Rooms" value="42" subtitle="3 hostels" icon={BedDouble} />
        <StatsCard title="Attendance Rate" value="92%" subtitle="Weekly average" icon={TrendingUp} />
      </div>

      {/* Welcome / Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Attendance marked', user: 'Warden A', time: '2 min ago', status: 'present' },
              { action: 'Student added', user: 'Admin', time: '15 min ago', status: 'new' },
              { action: 'Room changed', user: 'Warden B', time: '1 hr ago', status: 'transfer' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition">
                <div className={`w-2 h-2 rounded-full ${item.status === 'present' ? 'bg-emerald-400' : item.status === 'new' ? 'bg-blue-400' : 'bg-amber-400'}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1a1a2e] dark:text-white">{item.action}</p>
                  <p className="text-xs text-[#777] dark:text-[#999]">{item.user} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <a href="/attendance" className="neumorphic-btn w-full text-center">Mark Attendance</a>
            <a href="/reports" className="glass-btn w-full text-center">View Reports</a>
            <a href="/students" className="neumorphic-btn w-full text-center">Manage Students</a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}