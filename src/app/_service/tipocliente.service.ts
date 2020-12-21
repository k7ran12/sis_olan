import { Injectable } from '@angular/core';
import { TipoCliente } from '../_model/tipocliente';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoclienteService {
  private HOST: string = 'http://olancorp.com:30001';
  tipoClienteCambio = new Subject<TipoCliente[]>();
  mensajeCambio = new Subject<string>();
 //url: string = `${environment.HOST}/api/v1/TipoClientes`;
 url: string = `${this.HOST}/api/v1/TipoClientes`;

  constructor(private http : HttpClient) { }

listar(){
  return this.http.get<TipoCliente[]>(this.url);
}

listarPorId(idTipoCliente:number){
  return this.http.get<TipoCliente>(`${this.url}/${idTipoCliente}`);
}

registrar(tipoCliente:TipoCliente){
  return this.http.post(this.url,tipoCliente)
}

modificar(tipoCliente:TipoCliente){
  return this.http.put(this.url,tipoCliente)
}

eliminar(idTipoCliente : number){
  return this.http.delete(`${this.url}/${idTipoCliente}`);
}
}
