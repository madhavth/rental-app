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
  is_verified?: boolean;
  is_rejected?: boolean;
  is_rented?: boolean;
  propertyImages: Array<{ img: string }>;
  user_id?: string;
  price?: number;
  avgRating?: { arr?: Array<number>; rating: number };
  view_count?: number;
}
