import { create } from "zustand";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  price: string;
  time: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface OpeningHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

interface SiteData {
  services: Service[];
  contact: ContactInfo;
  hours: OpeningHours;
  loading: boolean;
  setServices: (s: Service[]) => void;
  setContact: (c: ContactInfo) => void;
  setHours: (h: OpeningHours) => void;
  setLoading: (loading: boolean) => void;
}

const defaultServices: Service[] = [
  { id: "1", icon: "Gauge", name: "Diagnostika", description: "Kompletná počítačová diagnostika", price: "od 30 €", time: "30 min" },
  { id: "2", icon: "Droplets", name: "Výmena oleja", description: "Olej + filter + kontrola", price: "od 45 €", time: "45 min" },
  { id: "3", icon: "Wrench", name: "Oprava bŕzd", description: "Výmena doštičiek a kotúčov", price: "od 80 €", time: "1-2 hod" },
  { id: "4", icon: "CircleDot", name: "Pneuservis", description: "Prezutie, vyváženie, oprava", price: "od 25 €", time: "30 min" },
  { id: "5", icon: "Car", name: "Geometria", description: "Nastavenie geometrie kolies", price: "od 40 €", time: "45 min" },
  { id: "6", icon: "Wind", name: "Klimatizácia", description: "Plnenie a čistenie klímy", price: "od 50 €", time: "1 hod" },
  { id: "7", icon: "Zap", name: "Elektrika", description: "Diagnostika a oprava elektriky", price: "od 35 €", time: "1-3 hod" },
  { id: "8", icon: "ShieldCheck", name: "Príprava STK", description: "Kontrola a príprava na STK/EK", price: "od 60 €", time: "1-2 hod" },
];

const defaultContact: ContactInfo = {
  phone: "+421 900 123 456",
  email: "info@autoservis.sk",
  address: "Hlavná 123, 811 01 Bratislava",
};

const defaultHours: OpeningHours = {
  weekdays: "8:00 – 17:00",
  saturday: "8:00 – 12:00",
  sunday: "Zatvorené",
};

export const useSiteData = create<SiteData>((set, get) => ({
  services: [], // Start empty, load from Firestore
  contact: defaultContact,
  hours: defaultHours,
  loading: true,
  setServices: (services) => {
    console.log("setServices called with:", services?.length, "services");
    set({ services });
  },
  setContact: (contact) => set({ contact }),
  setHours: (hours) => set({ hours }),
  setLoading: (loading) => set({ loading }),
}));

// Set up real-time listeners
const setupFirestoreListeners = () => {
  const { setServices, setContact, setHours, setLoading } = useSiteData.getState();

  console.log("Setting up Firestore listeners...");

  // Services listener
  const servicesUnsubscribe = onSnapshot(doc(db, 'Služby', 'Services'), (docSnap) => {
    console.log("🔍 Services snapshot received:", docSnap.exists());
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("🔍 Services raw data:", data);
      if (data && data.services && Array.isArray(data.services) && data.services.length > 0) {
        const services = data.services.map((s: any, index: number) => ({
          id: (index + 1).toString(),
          icon: "Wrench",
          name: s?.Název || s?.name || "",
          description: s?.Popis || s?.description || "",
          price: s?.Cena || s?.price || "",
          time: s?.Čas || s?.time || "",
        }));
        console.log("🔍 Setting services from Firestore:", services);
        setServices(services);
      } else {
        console.log("🔍 No valid services in Firestore, using defaults");
        setServices(defaultServices);
      }
    } else {
      console.log("🔍 Services document doesn't exist, using defaults");
      setServices(defaultServices);
    }
  }, (error) => {
    console.error("❌ Services listener error:", error);
    setServices(defaultServices);
  });

  // Contact listener
  const contactUnsubscribe = onSnapshot(doc(db, 'Služby', 'Contact'), (docSnap) => {
    console.log("Contact snapshot received:", docSnap.exists(), docSnap.data());
    if (docSnap.exists()) {
      const data = docSnap.data();
      setContact({
        phone: data.Telefon || defaultContact.phone,
        email: data.Email || defaultContact.email,
        address: data.Adresa || defaultContact.address,
      });
    }
  }, (error) => {
    console.error("Contact listener error:", error);
  });

  // Opening Hours listener
  const hoursUnsubscribe = onSnapshot(doc(db, 'Služby', 'Opening Hours'), (docSnap) => {
    console.log("Hours snapshot received:", docSnap.exists(), docSnap.data());
    if (docSnap.exists()) {
      const data = docSnap.data();
      setHours({
        weekdays: data.Weekdays || defaultHours.weekdays,
        saturday: data.Saturday || defaultHours.saturday,
        sunday: data.Sunday || defaultHours.sunday,
      });
    }
  }, (error) => {
    console.error("Hours listener error:", error);
  });

  // Set loading to false after initial load
  setTimeout(() => {
    console.log("Setting loading to false");
    setLoading(false);
  }, 1000);

  // Return cleanup function
  return () => {
    servicesUnsubscribe();
    contactUnsubscribe();
    hoursUnsubscribe();
  };
};

// Initialize listeners
if (typeof window !== 'undefined') {
  console.log("Initializing Firestore listeners...");
  try {
    setupFirestoreListeners();
  } catch (error) {
    console.error("Failed to initialize listeners, using fallback:", error);
    // Fallback to one-time reads
    setTimeout(async () => {
      const { setServices, setContact, setHours, setLoading } = useSiteData.getState();
      try {
        const { loadServicesFromFirestore, loadContactFromFirestore, loadOpeningHoursFromFirestore } = await import("@/firebase");

        const servicesData = await loadServicesFromFirestore();
        if (servicesData && servicesData.length > 0) {
          const services = servicesData.map((s: any, index: number) => ({
            id: (index + 1).toString(),
            icon: "Wrench",
            name: s?.Název || s?.name || "",
            description: s?.Popis || s?.description || "",
            price: s?.Cena || s?.price || "",
            time: s?.Čas || s?.time || "",
          }));
          setServices(services);
        } else {
          setServices(defaultServices);
        }

        const contactData = await loadContactFromFirestore();
        if (contactData) {
          setContact({
            phone: contactData.Telefon || defaultContact.phone,
            email: contactData.Email || defaultContact.email,
            address: contactData.Adresa || defaultContact.address,
          });
        }

        const hoursData = await loadOpeningHoursFromFirestore();
        if (hoursData) {
          setHours({
            weekdays: hoursData.Weekdays || defaultHours.weekdays,
            saturday: hoursData.Saturday || defaultHours.saturday,
            sunday: hoursData.Sunday || defaultHours.sunday,
          });
        }
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        setServices(defaultServices);
      }
      setLoading(false);
    }, 1000);
  }
}
