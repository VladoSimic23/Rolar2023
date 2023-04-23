export interface RoloRmInitialState {
  roloRMnalog: RoloRMnalog[];
  roloRMrezanje: RoloRMrezanjeI[];
  roloRMm2: number;
  trenutnoRoloRM: any;
}

export interface RoloI {
  _id?: string;
  nazivRoloRm: string;
  sirina: number | "";
  visina: number | "";
}
export interface RoloRMrezanjeI {
  id: string | "";
  tip: string | "";
  kutija: number | "";
  mrezaIzavrsna: number | "";
  vodilica: number | "";
  poprecniProfil: number | "";
  komada: number | "";
}
export interface RoloRMI {
  nazivRoloRm: string | "";
  kutija: number | "";
  mrezaIzavrsna: number | "";
  vodilica: number | "";
  poprecniProfil: number | "";
}

export interface RoloRMnalog {
  id: string | "";
  tip: string | "";
  sirina: number | "";
  visina: number | "";
  komada: number | "";
}
