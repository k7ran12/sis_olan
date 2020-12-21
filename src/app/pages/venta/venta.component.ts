
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/_service/producto.service';
import { DetalleVenta } from './../../_model/detalleVenta';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/_model/producto';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  form: FormGroup;
  
  productos: Producto[] = [];

  detalleVenta: DetalleVenta[]=[];

  myControlProducto: FormControl = new FormControl();

  productoSeleccionado : Producto;
  cantidad: number;
  precio : number;
  nombre: string;
  mensaje: string;
  total: number = 0;
  filteredOptionsProducto: Observable<any[]>;


  constructor( private  productoService:ProductoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = new FormGroup({
      'producto': this.myControlProducto,
      'fecha': new FormControl(new Date()),
      'cantidad': new FormControl(''),
      'precio': new FormControl('')
    });

    this.listarProducto();
    this.filteredOptionsProducto = this.myControlProducto.valueChanges.pipe(map(val => this.filterProducto(val)));
  }

  filterProducto(val: any) {
    if (val != null && val.idProducto > 0) {
      console.log(val);
      return this.productos.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()) );
    } else {
      return this.productos.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }

  listarProducto(){
    this.productoService.listar().subscribe(data =>{
      this.productos =data;
    })
  }

 
  seleccionarProducto(e: any) {
    this.productoSeleccionado = e.option.value;
  }


  displayFnProducto(val: Producto) {
    return val ? `${val.nombre}` : val;
  }


  agregarCarrito() {

     this.productos=this.form.value['producto'];

 //    console.log(this.productos);
    if (this.cantidad !=null ) {
     
  //    let deta = new Producto();
      let det = new DetalleVenta();
      det.cantidad = this.cantidad;
  //    det.producto.nombre="kenc";
      console.log(this.productos);
   //   deta.nombre=this.nombre;
      this.detalleVenta.push(det);
   //   this.detalleVenta.push(deta);
      this.cantidad = null;

     // setTimeout(() => {
     //   this.limpiarControles();
     // }, 2000);

    } else {
      this.mensaje = `Debe agregar la cantidad`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }
  removerProductoCantidad(index:number){
    this.detalleVenta.splice(index, 1);
  }

  calcular(){
    this.total =3;

  }

  limpiarControles() {
  //  var resetForm:HTMLFormElement;
  //  resetForm.reset();
 //   this.filteredOptionsProducto = new Observable<any[]>();
  //  this.filteredOptionsProducto = new Observable([]);
 //   this.seleccionarProducto.length='0'; .closePanel ();
  //  this.filteredOptionsProducto ="";
    this.form = new FormGroup({
      'cantidad': new FormControl()
   });
//   this.productoSeleccionado=Producto[''];

  }
}
