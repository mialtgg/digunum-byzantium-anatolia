export interface Coin {
  id: string;
  employee: string;
  observe: string;
  reverse: string;
  reference: string;
  location: string;
  imageUrl: string;
}

export interface Seal {
  id: string;
  employee: string;
  observe: string;
  reverse: string;
  reference: string;
  location: string;
  imageUrl: string;
}

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
  obverseDescription: string;
  reverseDescription: string;
}

export interface Seal {
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
  material: string;
  type: string;
  owner: string;
  inscription: string;
  dimensions: {
    length: number;
    width: number;
    thickness: number;
  };
}

export interface Emperor {
  id: string;
  name: string;
  reignStart: string;
  reignEnd: string;
  dynasty: string;
  description: string;
  imageUrl: string;
  achievements: string[];
  notableEvents: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}