export default function DiamondDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-12 ${className}`}>
      <div className="h-px w-20 bg-gold/40" />
      <div className="w-2.5 h-2.5 rotate-45 bg-gold shadow-[0_0_8px_rgba(184,134,11,0.4)]" />
      <div className="h-px w-20 bg-gold/40" />
    </div>
  );
}
