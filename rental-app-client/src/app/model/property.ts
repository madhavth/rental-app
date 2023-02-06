import { Review } from './review';

export interface Property {
  _id?: string;
  name?: string;
  location?: number[];
  reviews?: Review[];
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
