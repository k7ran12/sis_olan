import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from 'src/app/_model/producto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent implements OnInit {
/* Con dialogo*/
producto: Producto;
constructor(private dialogref: MatDialogRef<ProductoDialogComponent>,@Inject(MAT_DIALOG_DATA) private data:Producto, private productoService: ProductoService) { }

ngOnInit() {
  this.producto= new Producto();
  this.producto.id = this.data.id;
  this.producto.codigo = this.data.codigo;
  this.producto.nombre = this.data.nombre;
  this.producto.precio = parseFloat(this.data.precio).toFixed(2); // ).toFixed(2);
}

cancelar() {
  this.dialogref.close();
}

operar(){
  if(this.producto !=null && this.producto.id  > 0){
    this.productoService.modificar(this.producto).pipe(switchMap(()=>{
      return this.productoService.listar();
    })).subscribe( productos =>{
      this.productoService.productoCambio.next(productos);
      this.productoService.mensajeCambio.next("SE MODIFICO");
    });

  }
  else{
    this.productoService.registrar(this.producto).subscribe(()=>{
        this.productoService.listar().subscribe(productos => {
          this.productoService.productoCambio.next(productos);
          this.productoService.mensajeCambio.next("SE REGISTRO");
        });
    });
  }
  this.dialogref.close();
}
}
