export class FiltroReservaDTO {
    nroDocumento: number;
    nombreCompleto: string;
    fechaReserva: Date;

    constructor(nroDocumento: number, nombreCompleto: string, fechaReserva: Date) {
        this.nroDocumento = nroDocumento;
        this.nombreCompleto = nombreCompleto;
        this.fechaReserva = fechaReserva;
    }
}