export default function DiamondDivider({ className = '', align = 'center' }: { className?: string, align?: 'left' | 'center' }) {
  if (align === 'left') {
    return (
      <div className={`flex items-center justify-start gap-3 py-2 ${className}`}>
        <div className="w-2 h-2 rotate-45 bg-gold" />
        <div className="h-px w-32 bg-gold/30" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`}>
      <div className="h-px w-16 bg-gold/30" />
      <div className="w-2 h-2 rotate-45 bg-gold" />
      <div className="h-px w-16 bg-gold/30" />
    </div>
  );
}
