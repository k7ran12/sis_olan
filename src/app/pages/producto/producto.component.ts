import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { switchMap } from 'rxjs/operators';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  dataSource: MatTableDataSource<Producto>;
  displayedColumns=['idProducto','codigo','nombre','precio','acciones'];
  @ViewChild(MatSort,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  
  constructor(private productoService: ProductoService,private dialog:MatDialog , private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.productoService.productoCambio.subscribe(data=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      })
    })


    this.productoService.listar().subscribe(data=>{
      
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort = this.sort;

    });
  }


  openDialog(producto?:Producto){
    let med = producto !=null ? producto : new Producto();
    this.dialog.open(ProductoDialogComponent  , {
      width:'250px',
      data: med
    });
  }
  eliminar(producto: Producto){
   /*  this.productoService.eliminar(producto.idProducto).subscribe( () =>{ 
      this.productoService.listar().subscribe(data =>{
        this.productoService.productoCambio.next(data);
        this.productoService.mensajeCambio.next('Se elimino');
      })
    })

       this.productoService.eliminar(producto.idProducto).subscribe(() => {
      this.productoService.listar().subscribe(productos => {
        this.productoService.productoCambio.next(productos);
        this.productoService.mensajeCambio.next("Se elimino");
      });
    });
*/
    this.productoService.eliminar(producto.id).pipe(switchMap(() => {
      return this.productoService.listar();
    })).subscribe(data => {
      this.productoService.productoCambio.next(data);
      this.productoService.mensajeCambio.next("Se elimino");
    });
  }


}
