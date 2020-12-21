import { Injectable } from '@angular/core';
import { CampoDeportivo } from '../_model/campoDeportivo';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CampoDeportivoService {

  private HOST: string = 'http://olancorp.com:30001';

  campoDeportivoCambio = new Subject<CampoDeportivo[]>();
  mensajeCambio = new Subject<string>();
 // url: string = `${environment.HOST}/api/v1/campos-deportivos`;
 url: string = `${this.HOST}/api/v1/campos-deportivos`;
  constructor(private http : HttpClient) { }

listar(){
  return this.http.get<CampoDeportivo[]>(this.url);
}

listarPorId(idCampoDeportivo:number){
  return this.http.get<CampoDeportivo>(`${this.url}/${idCampoDeportivo}`);
}

registrar(medico:CampoDeportivo){
  return this.http.post(this.url,medico)
}

modificar(medico:CampoDeportivo){
  return this.http.put(this.url,medico)
}

eliminar(idCampoDeportivo : number){
  return this.http.delete(`${this.url}/${idCampoDeportivo}`);
}
}
