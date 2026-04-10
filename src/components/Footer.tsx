import { Wrench, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">AutoServis</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Profesionálny autoservis s dlhoročnými skúsenosťami. Staráme sa o vaše vozidlo ako o vlastné.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigácia</h3>
            <ul className="space-y-2">
              {[
                { label: "Úvod", href: "#intro" },
                { label: "Služby", href: "#services" },
                { label: "Kontakt", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleClick(item.href)}
                    className="text-primary-foreground/60 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                +421 900 123 456
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                info@autoservis.sk
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                Hlavná 123, Bratislava
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10 py-6">
        <p className="text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} AutoServis. Všetky práva vyhradené.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
