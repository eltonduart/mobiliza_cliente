import { Municipio } from "./Municipio";

export interface Distrito {
  id?: number;
  nome?: string;
  municipio_id?: number;
  municipio?: Municipio;
}
