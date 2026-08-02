export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`glass-card p-6 md:p-8 relative overflow-hidden ${className}`}>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#6366f1]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#818cf8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
