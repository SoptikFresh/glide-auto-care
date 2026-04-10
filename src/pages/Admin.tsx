import { useState, useEffect } from "react";
import { useSiteData, Service } from "@/store/siteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, Save, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { auth, ADMIN_UID, saveContactToFirestore, saveOpeningHoursToFirestore, saveServicesToFirestore, loadContactFromFirestore, loadOpeningHoursFromFirestore, loadServicesFromFirestore, debugFirestoreData } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

const Admin = () => {
  const { services, contact, hours, setServices, setContact, setHours } = useSiteData();

  const [editServices, setEditServices] = useState<Service[]>(services);
  const [editContact, setEditContact] = useState(contact);
  const [editHours, setEditHours] = useState(hours);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user && user.uid === ADMIN_UID) {
      loadDataFromFirestore();
    }
  }, [user]);

  const loadDataFromFirestore = async () => {
    try {
      const contactData = await loadContactFromFirestore();
      if (contactData) {
        setEditContact({
          phone: contactData.Telefon,
          email: contactData.Email,
          address: contactData.Adresa,
        });
      }

      const hoursData = await loadOpeningHoursFromFirestore();
      if (hoursData) {
        setEditHours({
          weekdays: hoursData.Weekdays,
          saturday: hoursData.Saturday,
          sunday: hoursData.Sunday,
        });
      }

      const servicesData = await loadServicesFromFirestore();
      if (servicesData) {
        setEditServices(servicesData.map((s: { Cena: string; Název: string; Popis: string; Čas: string }, index: number) => ({
          id: (index + 1).toString(),
          icon: "Wrench",
          name: s.Název,
          description: s.Popis,
          price: s.Cena,
          time: s.Čas,
        })));
      }
    } catch (error) {
      console.error("Error loading data from Firestore:", error);
      toast.error("Chyba při načítání dat");
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Přihlášení úspěšné");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Chyba při přihlášení");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Odhlášení úspěšné");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Chyba při odhlášení");
    }
  };

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

  const saveAll = async () => {
    if (!user || user.uid !== ADMIN_UID) {
      toast.error("Nejste oprávněni ukládat změny");
      return;
    }

    try {
      console.log("Saving contact:", {
        Adresa: editContact.address,
        Email: editContact.email,
        Telefon: editContact.phone,
      });
      await saveContactToFirestore({
        Adresa: editContact.address,
        Email: editContact.email,
        Telefon: editContact.phone,
      });

      console.log("Saving hours:", {
        Weekdays: editHours.weekdays,
        Saturday: editHours.saturday,
        Sunday: editHours.sunday,
      });
      await saveOpeningHoursToFirestore({
        Weekdays: editHours.weekdays,
        Saturday: editHours.saturday,
        Sunday: editHours.sunday,
      });

      const servicesToSave = editServices.map(s => ({
        Cena: s.price,
        Název: s.name,
        Popis: s.description,
        Čas: s.time,
      }));
      console.log("Saving services:", servicesToSave);
      await saveServicesToFirestore(servicesToSave);

      setServices(editServices);
      setContact(editContact);
      setHours(editHours);
      toast.success("Změny byli uložené do databáze!");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      toast.error("Chyba při ukládání do databáze");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Načítání...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Přihlášení</h1>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Heslo"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button onClick={handleLogin} className="w-full gap-2">
              <LogIn className="h-4 w-4" /> Přihlásit se
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (user.uid !== ADMIN_UID) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Přístup odepřen</h1>
          <p className="text-muted-foreground mb-6">Nemáte oprávnění k přístupu do admin panelu.</p>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" /> Odhlásit se
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground text-primary-foreground py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-accent transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user.email}</span>
          <Button onClick={handleLogout}  size="sm" className="gap-2">
            <LogOut className="h-4 w-4" /> Odhlásit
          </Button>
          <Button onClick={saveAll} className="gap-2">
            <Save className="h-4 w-4" /> Uložit vše
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 space-y-12 max-w-4xl">
        {/* Services */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Služby</h2>
            <Button variant="outline" onClick={addService} className="gap-2">
              <Plus className="h-4 w-4" /> Přidat
            </Button>
          </div>
          <div className="space-y-4">
            {editServices.map((s) => (
              <div key={s.id} className="bg-card border border-border rounded-xl p-5 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Název</label>
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
          <h2 className="text-2xl font-bold text-foreground mb-6">Kontaktní údaje</h2>
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
          <h2 className="text-2xl font-bold text-foreground mb-6">Otevírací hodiny</h2>
          <div className="bg-card border border-border rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Po – Pá</label>
              <Input value={editHours.weekdays} onChange={(e) => setEditHours({ ...editHours, weekdays: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Sobota</label>
              <Input value={editHours.saturday} onChange={(e) => setEditHours({ ...editHours, saturday: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Neděle</label>
              <Input value={editHours.sunday} onChange={(e) => setEditHours({ ...editHours, sunday: e.target.value })} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
