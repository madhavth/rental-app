import { Property } from './property';

export interface User {
  token?: string;
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: string;
  confirmpassword?: string;
  favorite_properties?: Property[];
}
