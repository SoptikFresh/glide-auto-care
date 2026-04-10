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
  const { services, loading } = useSiteData();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  console.log("🔍 ServicesSection - services:", services?.length, "items, loading:", loading);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("🔍 IntersectionObserver triggered:", entry.isIntersecting);
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      console.log("🔍 Setting up observer on ref");
      observer.observe(ref.current);
    } else {
      console.log("🔍 Ref is null");
    }
    return () => observer.disconnect();
  }, []);

  // Force visibility for debugging
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("🔍 Forcing visibility to true");
      setVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !services || services.length === 0) {
    return (
      <section id="services" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Načítání služeb...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Naše <span className="text-primary">služby</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              Žádné služby nejsou k dispozici.
            </p>
            <p className="text-sm text-muted-foreground">
              Services: {JSON.stringify(services)}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
                  <th className="text-left px-6 py-4 font-semibold text-white">Služby</th>
                  <th className="text-left px-6 py-4 font-semibold text-white">Popis</th>
                  <th className="text-left px-6 py-4 font-semibold text-white">Cena</th>
                  <th className="text-left px-6 py-4 font-semibold text-white">Čas</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => {
                  const Icon = iconMap[s.icon] || Wrench;
                  return (
                    <tr
                      key={s.id}
                      className="border-b border-border last:border-0 transition-all duration-500 hover:bg-accent/10"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-semibold text-black">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600">{s.description}</td>
                      <td className="px-6 py-5 font-semibold text-orange-500">{s.price}</td>
                      <td className="px-6 py-5 text-gray-600">{s.time}</td>
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
                className="bg-card rounded-xl p-5 shadow-md border border-border transition-all duration-500"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-black">{s.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">{s.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-orange-500">{s.price}</span>
                  <span className="text-gray-600">{s.time}</span>
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
