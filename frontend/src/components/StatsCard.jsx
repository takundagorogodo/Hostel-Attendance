import GlassCard from './GlassCard.jsx';

export default function StatsCard({ title, value, subtitle, icon: Icon }) {
  return (
    <GlassCard className="group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#777] dark:text-[#999] mb-2">{title}</p>
          <h3 className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white font-display">{value}</h3>
          <p className="text-xs text-[#777] dark:text-[#999] mt-1">{subtitle}</p>
        </div>
        {Icon && (
          <div className="p-3 rounded-2xl bg-white/20 dark:bg-white/5 shadow-glass backdrop-blur-md">
            <Icon size={22} className="text-[#6366f1]" />
          </div>
        )}
      </div>
    </GlassCard>
  );
}
