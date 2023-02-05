export interface Property {
  _id?: string;
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
  property_features: {
    bedrooms: number;
    bathrooms: number;
    beds: number;
  };
  propertyImages: Array<{ img: string }>;
  user_id?: string;
  price?: number;
  avgRating?: { arr?: Array<number>; rating: number };
}
