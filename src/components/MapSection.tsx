import { MapPin, Phone, Clock } from "lucide-react";
import { useSiteData } from "@/store/siteData";

const MapSection = () => {
  const { contact, hours, loading } = useSiteData();

  if (loading) {
    return (
      <section id="location" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="animate-pulse h-96 bg-gray-300 rounded-2xl"></div>
            <div className="space-y-5">
              <div className="animate-pulse h-24 bg-gray-300 rounded-xl"></div>
              <div className="animate-pulse h-24 bg-gray-300 rounded-xl"></div>
              <div className="animate-pulse h-24 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="location" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kde nás <span className="text-primary">najdete</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Navštivte nás osobně anebo nás kontaktujte
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
            <iframe
              src="https://mapy.com/s/remuvezero"
              width="100%"
              height="400"
              style={{ border: "none" }}
              title="Mapa - AutoServis"
              loading="lazy"
            />
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-5">
            <div className="bg-card rounded-xl p-6 shadow-md border border-border flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Adresa</h3>
                <p className="text-muted-foreground text-sm">{contact.address}</p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                <p className="text-muted-foreground text-sm">{contact.phone}</p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Otevírací hodiny</h3>
                <p className="text-muted-foreground text-sm">Po – Pá: {hours.weekdays}</p>
                <p className="text-muted-foreground text-sm">So: {hours.saturday}</p>
                <p className="text-muted-foreground text-sm">Ne: {hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
