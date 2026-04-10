import { ChevronRight, Clock, Shield, ThumbsUp, Users } from "lucide-react";

const highlights = [
  { icon: Shield, text: "Certifikovaný servis" },
  { icon: Clock, text: "Rýchle termíny" },
  { icon: ThumbsUp, text: "Garancia kvality" },
  { icon: Users, text: "15+ rokov skúseností" },
];

const HeroSection = () => {
  return (
    <section
      id="intro"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 animate-fade-in-up">
          Váš spoľahlivý{" "}
          <span className="text-accent">AutoServis</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Kompletná starostlivosť o vaše vozidlo na jednom mieste. Kvalita, rýchlosť a férovosť.
        </p>

        {/* Highlights grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={h.text}
                className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 animate-fade-in-up"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <Icon className="h-6 w-6 text-accent" />
                <span className="text-primary-foreground text-sm font-medium">{h.text}</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          Naše služby
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
