import { Component, OnInit, Inject } from '@angular/core';
import { TipoCliente } from 'src/app/_model/tipocliente';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CampodeportivoDialogComponent } from '../../campodeportivo/campodeportivo-dialog/campodeportivo-dialog.component';
import { TipoclienteService } from 'src/app/_service/tipocliente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tipocliente-dialog',
  templateUrl: './tipocliente-dialog.component.html',
  styleUrls: ['./tipocliente-dialog.component.css']
})
export class TipoclienteDialogComponent implements OnInit {

  /* Con dialogo*/
  tipoCliente: TipoCliente;
  value: string;
  viewValue: string;

  nombre :string;
  descripcion: string;
  idTipoClienteSeleccionado: string;

  constructor(private dialogref: MatDialogRef<CampodeportivoDialogComponent>,@Inject(MAT_DIALOG_DATA) private data:TipoCliente, private tipoClienteService: TipoclienteService) { }

  ngOnInit() {
    this.tipoCliente= new TipoCliente();
    this.tipoCliente.id = this.data.id;
    this.tipoCliente.nombre = this.data.nombre;
    this.tipoCliente.descripcion =this.data.descripcion;
    this.tipoCliente.estado = this.data.estado;

  }

  cancelar() {
    this.dialogref.close();
  }

  estadoBotonOperar() {

    return (this.idTipoClienteSeleccionado == null || this.tipoCliente.nombre == null || this.tipoCliente.descripcion == null );
  }

  operar(){
console.log(this.idTipoClienteSeleccionado);
    if(this.tipoCliente !=null && this.tipoCliente.id  > 0){
      let tipoCliente = new TipoCliente();
      tipoCliente.id =this.tipoCliente.id;
      tipoCliente.nombre=this.tipoCliente.nombre;
      tipoCliente.descripcion=this.tipoCliente.descripcion;
      tipoCliente.estado=this.idTipoClienteSeleccionado;
      this.tipoClienteService.modificar(tipoCliente).pipe(switchMap(()=>{
        return this.tipoClienteService.listar();
      })).subscribe( tipoClientes =>{
        this.tipoClienteService.tipoClienteCambio.next(tipoClientes);
        this.tipoClienteService.mensajeCambio.next("SE MODIFICO");
      });

    }
    else{
      let tipoCliente = new TipoCliente();
      tipoCliente.nombre=this.tipoCliente.nombre;
      tipoCliente.descripcion=this.tipoCliente.descripcion;
      tipoCliente.estado=this.idTipoClienteSeleccionado;

      this.tipoClienteService.registrar(tipoCliente).subscribe(()=>{
          this.tipoClienteService.listar().subscribe(tipoClientes => {
            this.tipoClienteService.tipoClienteCambio.next(tipoClientes);
            this.tipoClienteService.mensajeCambio.next("SE REGISTRO");
          });
      });
    }
    this.dialogref.close();
  }
}
