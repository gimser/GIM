export type CityId =
  | "casablanca"
  | "rabat"
  | "marrakech"
  | "fes"
  | "tangier"
  | "agadir";

export interface City {
  id: CityId;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  coordinates: [number, number];
}

export const MOROCCO_CITIES: City[] = [
  { id: "casablanca", nameEn: "Casablanca", nameFr: "Casablanca", nameAr: "الدار البيضاء", coordinates: [-7.617, 33.573] },
  { id: "rabat", nameEn: "Rabat", nameFr: "Rabat", nameAr: "الرباط", coordinates: [-6.842, 34.020] },
  { id: "marrakech", nameEn: "Marrakech", nameFr: "Marrakech", nameAr: "مراكش", coordinates: [-7.981, 31.629] },
  { id: "fes", nameEn: "Fes", nameFr: "Fès", nameAr: "فاس", coordinates: [-5.003, 34.033] },
  { id: "tangier", nameEn: "Tangier", nameFr: "Tanger", nameAr: "طنجة", coordinates: [-5.803, 35.759] },
  { id: "agadir", nameEn: "Agadir", nameFr: "Agadir", nameAr: "أكادير", coordinates: [-9.597, 30.427] }
];

export type EcoZoneId = 'noor-solar' | 'atlas-mountains' | 'essaouira-coast' | 'sahara-desert';
export interface EcoZone {
  id: EcoZoneId;
  title: string;
  description: string;
  coordinates: [number, number];
}

export const ECO_ZONES: EcoZone[] = [
  {
    id: 'noor-solar',
    title: 'Noor Solar (Ouarzazate)',
    description: 'One of the world\'s largest solar power complexes.',
    coordinates: [-6.869, 30.939]
  },
  {
    id: 'atlas-mountains',
    title: 'High Atlas Mountains',
    description: 'Mountain range with Berber villages and eco-hikes.',
    coordinates: [-7.5, 31.0]
  },
  {
    id: 'essaouira-coast',
    title: 'Essaouira Coast',
    description: 'Windy Atlantic coast known for sustainability projects.',
    coordinates: [-9.77, 31.51]
  },
  {
    id: 'sahara-desert',
    title: 'Sahara Desert',
    description: 'Dunes, oases, and eco-tourist camps near Merzouga.',
    coordinates: [-4.01, 31.1]
  },
];
