import { Component, OnInit, Inject } from '@angular/core';
import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tipodocumento-dialog',
  templateUrl: './tipodocumento-dialog.component.html',
  styleUrls: ['./tipodocumento-dialog.component.css']
})
export class TipodocumentoDialogComponent implements OnInit {
/* Con dialogo*/
tipoDocumento: TipoDocumento;
value: string;
viewValue: string;

nombre: string;
descripcion: string;
idTipoDocumentoSeleccionado: string;

constructor(private dialogref: MatDialogRef<TipodocumentoDialogComponent>,@Inject(MAT_DIALOG_DATA) private data:TipoDocumento, private tipoDocumentoService: TipodocumentoService) { }

ngOnInit() {
  this.tipoDocumento= new TipoDocumento();
  this.tipoDocumento.id = this.data.id;
  this.tipoDocumento.nombre = this.data.nombre;
  this.tipoDocumento.descripcion=this.data.descripcion;
  this.tipoDocumento.estado = this.data.estado;

}

cancelar() {
  this.dialogref.close();
}

estadoBotonOperar() {

  return (this.idTipoDocumentoSeleccionado == null || this.tipoDocumento.nombre == null || this.tipoDocumento.descripcion == null );
}

operar(){

  if(this.tipoDocumento !=null && this.tipoDocumento.id  > 0){

    let tipoDocumento = new TipoDocumento();
    tipoDocumento.id=this.tipoDocumento.id;
    tipoDocumento.nombre=this.tipoDocumento.nombre;
    tipoDocumento.descripcion =this.tipoDocumento.descripcion;
    tipoDocumento.estado=this.idTipoDocumentoSeleccionado;
    this.tipoDocumentoService.modificar(tipoDocumento).pipe(switchMap(()=>{
      return this.tipoDocumentoService.listar();
    })).subscribe( tipoDocumentos =>{
      this.tipoDocumentoService.tipoDocumentoCambio.next(tipoDocumentos);
      this.tipoDocumentoService.mensajeCambio.next("SE MODIFICO");
    });

  }
  else{
    let tipoDocumento = new TipoDocumento();
    tipoDocumento.nombre=this.tipoDocumento.nombre;
    tipoDocumento.descripcion =this.tipoDocumento.descripcion;
    tipoDocumento.estado=this.idTipoDocumentoSeleccionado;
    this.tipoDocumentoService.registrar(tipoDocumento).subscribe(()=>{
        this.tipoDocumentoService.listar().subscribe(tipoDocumentos => {
          this.tipoDocumentoService.tipoDocumentoCambio.next(tipoDocumentos);
          this.tipoDocumentoService.mensajeCambio.next("SE REGISTRO");
        });
    });
  }
  this.dialogref.close();
}
}
