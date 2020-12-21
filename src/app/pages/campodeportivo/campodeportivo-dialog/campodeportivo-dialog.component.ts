import { switchMap } from 'rxjs/operators';
import { CampoDeportivoService } from '../../../_service/campoDeportivo.service';

import { Component, OnInit, Inject } from '@angular/core';
import { CampoDeportivo } from 'src/app/_model/campoDeportivo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-campodeportivo-dialog',
  templateUrl: './campodeportivo-dialog.component.html',
  styleUrls: ['./campodeportivo-dialog.component.css']
})
export class CampodeportivoDialogComponent implements OnInit {
/* Con dialogo*/
  campoDeportivo: CampoDeportivo;
  value: string;
  viewValue: string;



  constructor(private dialogref: MatDialogRef<CampodeportivoDialogComponent>,@Inject(MAT_DIALOG_DATA) private data:CampoDeportivo, private campoDeportivoService: CampoDeportivoService) { }

  ngOnInit() {
    this.campoDeportivo= new CampoDeportivo();
    this.campoDeportivo.id = this.data.id;
    this.campoDeportivo.nombre = this.data.nombre;
    this.campoDeportivo.precio=this.data.precio;
    this.campoDeportivo.estado = this.data.estado;

  }

  cancelar() {
    this.dialogref.close();
  }

  operar(){

    if(this.campoDeportivo !=null && this.campoDeportivo.id  > 0){
      this.campoDeportivoService.modificar(this.campoDeportivo).pipe(switchMap(()=>{
        return this.campoDeportivoService.listar();
      })).subscribe( campoDeportivos =>{
        this.campoDeportivoService.campoDeportivoCambio.next(campoDeportivos);
        this.campoDeportivoService.mensajeCambio.next("SE MODIFICO");
      });

    }
    else{

      this.campoDeportivoService.registrar(this.campoDeportivo).subscribe(()=>{
          this.campoDeportivoService.listar().subscribe(campoDeportivos => {
            this.campoDeportivoService.campoDeportivoCambio.next(campoDeportivos);
            this.campoDeportivoService.mensajeCambio.next("SE REGISTRO");
          });
      });
    }
    this.dialogref.close();
  }
}
