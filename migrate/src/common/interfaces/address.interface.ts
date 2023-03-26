export interface Address {
  country: string;
  city: string;
  state?: string;
  streetAddress: string;
  zipCode: string;
  isVerifiedAddress: boolean;
}
