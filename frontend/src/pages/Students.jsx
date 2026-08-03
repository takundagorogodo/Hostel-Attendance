import GlassCard from '../components/GlassCard.jsx';
import { Users } from 'lucide-react';

export default function Students() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-[#1a1a2e] dark:text-white">Students</h1>
          <p className="text-sm text-[#777] dark:text-[#999] mt-2">Manage student records, enrollments, and room assignments.</p>
        </div>
        <a href="#" className="neumorphic-btn">+ Add Student</a>
      </div>
      <GlassCard>
        <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-4 flex items-center gap-2"><Users size={20} /> Student List</h3>
        <p className="text-sm text-[#777] dark:text-[#999]">Connected endpoint: GET /api/students • Admin/warden access only.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-[#777] dark:text-[#999] border-b border-white/20 dark:border-white/10">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 dark:divide-white/5">
              {[
                { name: 'Aarav Mehta', id: 'STU-101', room: 'R-12', status: 'Active' },
                { name: 'Isha Patel', id: 'STU-102', room: 'R-15', status: 'Active' },
                { name: 'Rohan Das', id: 'STU-103', room: 'R-08', status: 'Active' },
              ].map((s) => (
                <tr key={s.id} className="hover:bg-white/5 dark:hover:bg-white/5 transition">
                  <td className="px-4 py-3 font-medium text-[#1a1a2e] dark:text-white">{s.name}</td>
                  <td className="px-4 py-3 text-[#777] dark:text-[#999]">{s.id}</td>
                  <td className="px-4 py-3 text-[#777] dark:text-[#999]">{s.room}</td>
                  <td className="px-4 py-3"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-600 dark:text-emerald-300">{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}