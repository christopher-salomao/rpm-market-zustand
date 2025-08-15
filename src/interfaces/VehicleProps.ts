export interface VehicleProps {
  id: string;
  name: string;
  model: string;
  year: string;
  km: string;
  whatsapp: string;
  city: string;
  price: string | number;
  description: string;
  creationDate: string;
  owner: string;
  uid: string;
  images: VehicleImageProps[];
}

interface VehicleImageProps {
  uid: string;
  name: string;
  url: string;
}
