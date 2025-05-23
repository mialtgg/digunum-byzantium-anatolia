export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract?: string;
  keywords?: string[];
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
} 