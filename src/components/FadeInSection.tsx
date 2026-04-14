import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function FadeInSection({ children, className = '', delay = 0, direction = 'up' }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = { opacity: 0, duration: 0.8, delay };
    const toVars: gsap.TweenVars = { opacity: 1, duration: 0.8, delay };

    switch (direction) {
      case 'up':
        fromVars.y = 40;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -40;
        toVars.y = 0;
        break;
      case 'left':
        fromVars.x = 40;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = -40;
        toVars.x = 0;
        break;
    }

    gsap.fromTo(el, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
