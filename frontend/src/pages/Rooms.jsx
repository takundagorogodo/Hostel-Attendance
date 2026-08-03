import GlassCard from '../components/GlassCard.jsx';
import { BedDouble } from 'lucide-react';

export default function Rooms() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-[#1a1a2e] dark:text-white">Rooms</h1>
        <p className="text-sm text-[#777] dark:text-[#999] mt-2">Manage hostel rooms, capacities, and student assignments.</p>
      </div>
      <GlassCard>
        <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white mb-4 flex items-center gap-2"><BedDouble size={20} /> Room Overview</h3>
        <p className="text-sm text-[#777] dark:text-[#999]">Connected endpoints: GET /rooms, PATCH /students/:id/room, PATCH /students/:id/transfer</p>
      </GlassCard>
    </div>
  );
}
