import { Component, OnInit, Inject } from '@angular/core';
import { Estado } from 'src/app/_model/estado';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EstadoService } from 'src/app/_service/estado.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-estado-dialog',
  templateUrl: './estado-dialog.component.html',
  styleUrls: ['./estado-dialog.component.css']
})
export class EstadoDialogComponent implements OnInit {
/* Con dialogo*/
estado: Estado;
nombre: string;
idEstadoSeleccionado: string;
constructor(private dialogref: MatDialogRef<EstadoDialogComponent>,@Inject(MAT_DIALOG_DATA) private data:Estado, private estadoService: EstadoService) { }

ngOnInit() {

  this.estado= new Estado();
  this.estado.id = this.data.id;
  this.estado.nombre = this.data.nombre;
  this.estado.estado = this.data.estado;

}

cancelar() {
  this.dialogref.close();
}

estadoBotonOperar() {

  return (this.idEstadoSeleccionado == null || this.estado.nombre == null );
}

operar(){


  if(this.estado !=null && this.estado.id  > 0){
    let estado = new Estado();
    estado.id=this.estado.id;
    estado.nombre=this.estado.nombre;
    estado.estado=this.idEstadoSeleccionado;
    this.estadoService.modificar(estado).pipe(switchMap(()=>{
      return this.estadoService.listar();
    })).subscribe( estados =>{
      this.estadoService.estadoCambio.next(estados);
      this.estadoService.mensajeCambio.next("SE MODIFICO");
    });

  }
  else{
    let estado = new Estado();
    estado.nombre=this.estado.nombre;
    estado.estado=this.idEstadoSeleccionado;

    this.estadoService.registrar(estado).subscribe(()=>{
        this.estadoService.listar().subscribe(estados => {
          this.estadoService.estadoCambio.next(estados);
          this.estadoService.mensajeCambio.next("SE REGISTRO");
        });
    });
  }
  this.dialogref.close();
}
}
