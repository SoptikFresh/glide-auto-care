import { Wrench, Mail, Phone, MapPin } from "lucide-react";
import { useSiteData } from "@/store/siteData";

const Footer = () => {
  const { contact, loading } = useSiteData();

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <footer id="contact" className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-64"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">AutoServis Joura</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Profesionální autoservis s dlouholetými zkušenostmi. Staráme se o vaše vozidlo jako o vlastní.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigace</h3>
            <ul className="space-y-2">
              {[
                { label: "Úvod", href: "#intro" },
                { label: "Služby", href: "#services" },
                { label: "Kde nás nájdete", href: "#location" },
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

          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                {contact.phone}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                {contact.email}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                {contact.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-6">
        <p className="text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} AutoServis Joura. Všechna práva vyhrazena.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
