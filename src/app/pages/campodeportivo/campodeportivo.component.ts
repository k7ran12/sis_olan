import { CampodeportivoDialogComponent } from './campodeportivo-dialog/campodeportivo-dialog.component';
import { CampoDeportivoService } from './../../_service/campoDeportivo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { CampoDeportivo } from 'src/app/_model/campoDeportivo';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-campodeportivo',
  templateUrl: './campodeportivo.component.html',
  styleUrls: ['./campodeportivo.component.css']
})
export class CampodeportivoComponent implements OnInit {
  dataSource: MatTableDataSource<CampoDeportivo>;
  displayedColumns=['idCampoDeportivo','nombre','precio','estado','acciones'];
  @ViewChild(MatSort,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  
  constructor(private campoDeportivoService: CampoDeportivoService,private dialog:MatDialog , private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.campoDeportivoService.campoDeportivoCambio.subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.campoDeportivoService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      })
    })


    this.campoDeportivoService.listar().subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;

    });
  }


  openDialog(campoDeportivo?:CampoDeportivo){
    let med = campoDeportivo !=null ? campoDeportivo : new CampoDeportivo();
    this.dialog.open(CampodeportivoDialogComponent  , {
      width:'250px',
      data: med
    });
  }

  applyFilter(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  
  eliminar(campoDeportivo: CampoDeportivo){
   /*  this.campoDeportivoService.eliminar(campoDeportivo.idCampoDeportivo).subscribe( () =>{ 
      this.campoDeportivoService.listar().subscribe(data =>{
        this.campoDeportivoService.campoDeportivoCambio.next(data);
        this.campoDeportivoService.mensajeCambio.next('Se elimino');
      })
    })

       this.campoDeportivoService.eliminar(campoDeportivo.idCampoDeportivo).subscribe(() => {
      this.campoDeportivoService.listar().subscribe(campoDeportivos => {
        this.campoDeportivoService.campoDeportivoCambio.next(campoDeportivos);
        this.campoDeportivoService.mensajeCambio.next("Se elimino");
      });
    });
*/
    this.campoDeportivoService.eliminar(campoDeportivo.id).pipe(switchMap(() => {
      return this.campoDeportivoService.listar();
    })).subscribe(data => {
      this.campoDeportivoService.campoDeportivoCambio.next(data);
      this.campoDeportivoService.mensajeCambio.next("Se elimino");
    });
  }


}
