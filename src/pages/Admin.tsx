import { useState } from "react";
import { useSiteData, Service } from "@/store/siteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Admin = () => {
  const { services, contact, hours, setServices, setContact, setHours } = useSiteData();

  const [editServices, setEditServices] = useState<Service[]>(services);
  const [editContact, setEditContact] = useState(contact);
  const [editHours, setEditHours] = useState(hours);

  const updateService = (id: string, field: keyof Service, value: string) => {
    setEditServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addService = () => {
    setEditServices((prev) => [
      ...prev,
      { id: Date.now().toString(), icon: "Wrench", name: "", description: "", price: "", time: "" },
    ]);
  };

  const removeService = (id: string) => {
    setEditServices((prev) => prev.filter((s) => s.id !== id));
  };

  const saveAll = () => {
    setServices(editServices);
    setContact(editContact);
    setHours(editHours);
    toast.success("Zmeny boli uložené!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground text-primary-foreground py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-accent transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <Button onClick={saveAll} className="gap-2">
          <Save className="h-4 w-4" /> Uložiť všetko
        </Button>
      </header>

      <div className="container mx-auto px-6 py-10 space-y-12 max-w-4xl">
        {/* Services */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Služby</h2>
            <Button variant="outline" onClick={addService} className="gap-2">
              <Plus className="h-4 w-4" /> Pridať
            </Button>
          </div>
          <div className="space-y-4">
            {editServices.map((s) => (
              <div key={s.id} className="bg-card border border-border rounded-xl p-5 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Názov</label>
                  <Input value={s.name} onChange={(e) => updateService(s.id, "name", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Popis</label>
                  <Input value={s.description} onChange={(e) => updateService(s.id, "description", e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Cena</label>
                  <Input value={s.price} onChange={(e) => updateService(s.id, "price", e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Čas</label>
                    <Input value={s.time} onChange={(e) => updateService(s.id, "time", e.target.value)} />
                  </div>
                  <Button variant="destructive" size="icon" className="mt-auto" onClick={() => removeService(s.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Kontaktné údaje</h2>
          <div className="bg-card border border-border rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Telefón</label>
              <Input value={editContact.phone} onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Email</label>
              <Input value={editContact.email} onChange={(e) => setEditContact({ ...editContact, email: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Adresa</label>
              <Input value={editContact.address} onChange={(e) => setEditContact({ ...editContact, address: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Opening hours */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Otváracie hodiny</h2>
          <div className="bg-card border border-border rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Po – Pi</label>
              <Input value={editHours.weekdays} onChange={(e) => setEditHours({ ...editHours, weekdays: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Sobota</label>
              <Input value={editHours.saturday} onChange={(e) => setEditHours({ ...editHours, saturday: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Nedeľa</label>
              <Input value={editHours.sunday} onChange={(e) => setEditHours({ ...editHours, sunday: e.target.value })} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
