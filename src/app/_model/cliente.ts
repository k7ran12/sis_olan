import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { TipoCliente } from './tipocliente';
export class Cliente{
    id: number;
    tipoCliente: TipoCliente;
    tipoDocumento: TipoDocumento;
    nroDocumento: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    razonSocial: string;
    celular: string;
    estado: string;
    fechaRegistro: string;
}