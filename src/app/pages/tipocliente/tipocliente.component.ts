import { TipoclienteDialogComponent } from './tipocliente-dialog/tipocliente-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoCliente } from 'src/app/_model/tipocliente';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { TipoclienteService } from 'src/app/_service/tipocliente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tipocliente',
  templateUrl: './tipocliente.component.html',
  styleUrls: ['./tipocliente.component.css']
})
export class TipoclienteComponent implements OnInit {
  dataSource: MatTableDataSource<TipoCliente>;
  displayedColumns=['idTipoCliente','nombre','descripcion','estado','acciones'];
  @ViewChild(MatSort,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  
  constructor(private tipoClienteService: TipoclienteService,private dialog:MatDialog , private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.tipoClienteService.tipoClienteCambio.subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.tipoClienteService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      })
    })


    this.tipoClienteService.listar().subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;

    });
  }


  openDialog(tipoCliente?:TipoCliente){
    let med = tipoCliente !=null ? tipoCliente : new TipoCliente();
    this.dialog.open(TipoclienteDialogComponent  , {
      width:'250px',
      data: med
    });
  }

  applyFilter(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  
  eliminar(tipoCliente: TipoCliente){

    this.tipoClienteService.eliminar(tipoCliente.id).pipe(switchMap(() => {
      return this.tipoClienteService.listar();
    })).subscribe(data => {
      this.tipoClienteService.tipoClienteCambio.next(data);
      this.tipoClienteService.mensajeCambio.next("Se elimino");
    });
  }


}
