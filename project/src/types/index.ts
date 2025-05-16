export interface Coin {
  id: string;
  name: string;
  period: string;
  year: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  mint: string;
  material: string;
  denomination: string;
  obverseDescription: string;
  reverseDescription: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}