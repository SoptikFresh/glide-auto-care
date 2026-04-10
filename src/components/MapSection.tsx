import { MapPin, Phone, Clock } from "lucide-react";

const MapSection = () => {
  return (
    <section id="location" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kde nás <span className="text-primary">nájdete</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Navštívte nás osobne alebo nás kontaktujte
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
                <p className="text-muted-foreground text-sm">Hlavná 123, 811 01 Bratislava</p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Telefón</h3>
                <p className="text-muted-foreground text-sm">+421 900 123 456</p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-md border border-border flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Otváracie hodiny</h3>
                <p className="text-muted-foreground text-sm">Po – Pi: 8:00 – 17:00</p>
                <p className="text-muted-foreground text-sm">So: 8:00 – 12:00</p>
                <p className="text-muted-foreground text-sm">Ne: Zatvorené</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
