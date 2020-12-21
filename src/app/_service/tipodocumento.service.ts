import { Injectable } from '@angular/core';
import { TipoDocumento } from '../_model/tipodocumento';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {
 private HOST: string = 'http://olancorp.com:30001';
  tipoDocumentoCambio = new Subject<TipoDocumento[]>();
  mensajeCambio = new Subject<string>();
// url: string = `${environment.HOST}/api/v1/tipo-documentos`;
  url: string = `${this.HOST}/api/v1/tipo-documentos`;
  
  constructor(private http : HttpClient) { }

listar(){
  return this.http.get<TipoDocumento[]>(this.url);
}

listarPorId(idTipoDocumento:number){
  return this.http.get<TipoDocumento>(`${this.url}/${idTipoDocumento}`);
}

registrar(tipoDocumento:TipoDocumento){
  return this.http.post(this.url,tipoDocumento)
}

modificar(tipoDocumento:TipoDocumento){
  return this.http.put(this.url,tipoDocumento)
}

eliminar(idTipoDocumento : number){
  return this.http.delete(`${this.url}/${idTipoDocumento}`);
}
}
