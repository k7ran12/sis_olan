import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { TipodocumentoDialogComponent } from './tipodocumento-dialog/tipodocumento-dialog.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css']
})
export class TipodocumentoComponent implements OnInit {
  dataSource: MatTableDataSource<TipoDocumento>;
  displayedColumns=['idTipoDocumento','nombre','descripcion','estado','acciones'];
  @ViewChild(MatSort,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  
  constructor(private tipoDocumentoService: TipodocumentoService,private dialog:MatDialog , private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.tipoDocumentoService.tipoDocumentoCambio.subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.tipoDocumentoService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      })
    })


    this.tipoDocumentoService.listar().subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;

    });
  }


  openDialog(tipoDocumento?:TipoDocumento){
    let med = tipoDocumento !=null ? tipoDocumento : new TipoDocumento();
    this.dialog.open(TipodocumentoDialogComponent , {
      width:'250px',
      data: med
    });
  }

  applyFilter(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  
  eliminar(tipoDocumento: TipoDocumento){

    this.tipoDocumentoService.eliminar(tipoDocumento.id).pipe(switchMap(() => {
      return this.tipoDocumentoService.listar();
    })).subscribe(data => {
      this.tipoDocumentoService.tipoDocumentoCambio.next(data);
      this.tipoDocumentoService.mensajeCambio.next("Se elimino");
    });
  }


}
