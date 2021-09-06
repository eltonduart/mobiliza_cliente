import { Distrito } from "./Distrito";
import { Municipio } from "./Municipio";

export interface Pessoa {
  id?: number;
  nome?: string;
  apelido?: string;
  endereco?: string;
  bairro?: string;
  telefone?: string;
  dta_nascimento?: Date;
  whatsapp?: string;
  instagran?: string;
  facebook?: string;
  titulo?: string;
  zona_eleitoral?: string;
  secao_eleitoral?: string;
  tipo_usuario?: string;
  status?: string;
  municipio_id?: number;
  municipio?: Municipio;
  distrito?: Distrito;
  owner_user_id?: string;
}
