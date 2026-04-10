import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  setServices: (s: Service[]) => void;
  setContact: (c: ContactInfo) => void;
  setHours: (h: OpeningHours) => void;
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

export const useSiteData = create<SiteData>()(
  persist(
    (set) => ({
      services: defaultServices,
      contact: {
        phone: "+421 900 123 456",
        email: "info@autoservis.sk",
        address: "Hlavná 123, 811 01 Bratislava",
      },
      hours: {
        weekdays: "8:00 – 17:00",
        saturday: "8:00 – 12:00",
        sunday: "Zatvorené",
      },
      setServices: (services) => set({ services }),
      setContact: (contact) => set({ contact }),
      setHours: (hours) => set({ hours }),
    }),
    { name: "autoservis-data" }
  )
);
