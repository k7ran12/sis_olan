import { Component, OnInit, ViewChild } from '@angular/core';
import { Estado } from 'src/app/_model/estado';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { EstadoService } from 'src/app/_service/estado.service';
import { switchMap } from 'rxjs/operators';
import { EstadoDialogComponent } from './estado-dialog/estado-dialog.component';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  dataSource: MatTableDataSource<Estado>;
  displayedColumns=['idEstado','nombre','estado','acciones'];
  @ViewChild(MatSort,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;

  constructor(private estadoService: EstadoService,private dialog:MatDialog , private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.estadoService.estadoCambio.subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.estadoService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      })
    })


    this.estadoService.listar().subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;

    });
  }


  openDialog(estado?:Estado){
    
    let med = estado !=null ? estado : new Estado();
    this.dialog.open(EstadoDialogComponent  , {
      width:'250px',
      data: med
    });
  }

  applyFilter(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  
  eliminar(estado: Estado){
    this.estadoService.eliminar(estado.id).pipe(switchMap(() => {
      return this.estadoService.listar();
    })).subscribe(data => {
      this.estadoService.estadoCambio.next(data);
      this.estadoService.mensajeCambio.next("Se elimino");
    });
  }


}
