import { FiltroReservaDTO } from './../_dto/filtroReservaDTO';
import { Reserva } from './../_model/reserva';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConsultaResumenDTO } from '../_dto/consultaResumenDTO';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private HOST: string = 'http://olancorp.com:30001';
  reservaCambio = new Subject<Reserva[]>();
  mensajeCambio = new Subject<string>();
// url: string = `${environment.HOST}/reservas`;
 url: string = `${this.HOST}/api/v1/reservas`;
 
  constructor(private http : HttpClient) { }

  registrar(reserva:Reserva){
    return this.http.post(this.url,reserva)
  }

  buscar(filtroReserva: FiltroReservaDTO) {
    return this.http.post<Reserva[]>(`${this.url}/buscar`, filtroReserva);
  }

  listarResumen() {
    return this.http.get<[ConsultaResumenDTO]>(`${this.url}/listarResumen`);
  }
  
}
