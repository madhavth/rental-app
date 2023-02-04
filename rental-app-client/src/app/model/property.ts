export interface Property {
  name?: string;
  location?: {
    longitude: number;
    latitude: number;
  };
  reviews?: [
    {
      comment: string;
      rating: number;
      user_id: string;
    }
  ];
  description?: string;
  type?: string;
  propertyImages: Array<{ img: string }>;
  user_id?: string;
  price?: number;
  avgRating?: { arr?: Array<number>; rating: number };
}
