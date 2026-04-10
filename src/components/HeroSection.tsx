import { ChevronRight } from "lucide-react";

const bubbles = [
  "Profesionálny autoservis",
  "Diagnostika vozidiel",
  "Výmena oleja a filtrov",
  "Oprava bŕzd",
  "Pneuservis",
  "Geometria kolies",
  "Klimatizácia",
  "Elektrika vozidiel",
  "Príprava na STK",
  "Autoumyváreň",
];

const HeroSection = () => {
  // Duplicate for seamless infinite scroll
  const allBubbles = [...bubbles, ...bubbles];

  return (
    <section
      id="intro"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 animate-fade-in-up">
          Váš spoľahlivý{" "}
          <span className="text-accent">AutoServis</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Kompletná starostlivosť o vaše vozidlo na jednom mieste. Kvalita, rýchlosť a férovosť.
        </p>
        <button
          onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Naše služby
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Sliding bubbles */}
      <div className="relative z-10 w-full overflow-hidden py-4">
        <div className="bubble-slide flex gap-4 w-max">
          {allBubbles.map((text, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground font-medium text-sm transition-all duration-300 hover:bg-primary-foreground/20 hover:scale-105 cursor-default select-none"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
