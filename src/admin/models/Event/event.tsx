

export interface Event {
codi: number;
  denominacio: string;
  descripcio: string;
  dataIni: Date;
  dataFi: Date;
  horari?: string;
  adress: string;
  lat?: number;
  long?: number;
  price?: string;
  url?: string;
  categoria: string;
}