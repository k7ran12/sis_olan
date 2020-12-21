import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Estado } from '../_model/estado';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private HOST: string = 'http://olancorp.com:30001';
  estadoCambio = new Subject<Estado[]>();
  mensajeCambio = new Subject<string>();
// url: string = `${environment.HOST}/api/v1/estados`;
 url: string = `${this.HOST}/api/v1/estados`;
  constructor(private http : HttpClient) { }

listar(){
  return this.http.get<Estado[]>(this.url);
}

listarPorId(idEstado:number){
  return this.http.get<Estado>(`${this.url}/${idEstado}`);
}

registrar(estado:Estado){
  return this.http.post(this.url,estado)
}

modificar(estado:Estado){
  return this.http.put(this.url,estado)
}

eliminar(idEstado : number){
  return this.http.delete(`${this.url}/${idEstado}`);
}
}
