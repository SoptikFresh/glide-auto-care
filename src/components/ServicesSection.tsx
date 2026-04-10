import { useEffect, useRef, useState } from "react";
import {
  Wrench,
  Gauge,
  Droplets,
  CircleDot,
  Wind,
  Zap,
  ShieldCheck,
  Car,
  LucideIcon,
} from "lucide-react";
import { useSiteData } from "@/store/siteData";

const iconMap: Record<string, LucideIcon> = {
  Gauge, Droplets, Wrench, CircleDot, Car, Wind, Zap, ShieldCheck,
};

const ServicesSection = () => {
  const { services } = useSiteData();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Naše <span className="text-primary">služby</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nabízíme široký rozsah služeb pro všechny typy vozidel
          </p>
        </div>

        <div className="hidden md:block">
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-6 py-4 font-semibold">Služby</th>
                  <th className="text-left px-6 py-4 font-semibold">Popis</th>
                  <th className="text-left px-6 py-4 font-semibold">Cena</th>
                  <th className="text-left px-6 py-4 font-semibold">Čas</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => {
                  const Icon = iconMap[s.icon] || Wrench;
                  return (
                    <tr
                      key={s.id}
                      className={`border-b border-border last:border-0 transition-all duration-500 hover:bg-accent/10 ${
                        visible ? "animate-fade-in-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-semibold text-foreground">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-muted-foreground">{s.description}</td>
                      <td className="px-6 py-5 font-semibold text-accent">{s.price}</td>
                      <td className="px-6 py-5 text-muted-foreground">{s.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:hidden grid gap-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Wrench;
            return (
              <div
                key={s.id}
                className={`bg-card rounded-xl p-5 shadow-md border border-border transition-all duration-500 ${
                  visible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{s.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{s.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-accent">{s.price}</span>
                  <span className="text-muted-foreground">{s.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
