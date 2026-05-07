export default function DiamondDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-6 my-16 py-4 w-full ${className}`}>
      <div className="h-px w-24 bg-primary/40" />
      <div className="w-3 h-3 rotate-45 bg-primary shadow-[0_0_12px_rgba(139,92,246,0.5)]" />
      <div className="h-px w-24 bg-primary/40" />
    </div>
  );
}
