import { Reserva } from './../../_model/reserva';
import { CampoDeportivo } from 'src/app/_model/campoDeportivo';
import { EstadoService } from 'src/app/_service/estado.service';
import { CampoDeportivoService } from './../../_service/campoDeportivo.service';
import { ClienteService } from 'src/app/_service/cliente.service';
import { Estado } from 'src/app/_model/estado';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/_model/cliente';
import { ReservaService } from 'src/app/_service/reserva.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  hora: string;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  //cod cri
  

  items = [];

  onClick(hora, item, incrementador){    

    //console.log(item); 
    //this.rd.setStyle(item, 'background-color', '#000080'); 
    this.items.push(incrementador);
    console.log(this.items);

    for(var i = 0;i < this.items.length; i++){
      console.log(this.items[i] + " "+ this.tiles[this.items[i]].hora)
      this.tiles[this.items[i]].color = 'reservando';
    }

   
    }

    hacerReserva(){
      alert("reserva "+ this.items);
      
      for(var i = 0;i < this.items.length; i++){
        console.log(this.items[i] + " "+ this.tiles[this.items[i]].hora)
        this.tiles[this.items[i]].color = 'reservado';
      }
      this.items = [];
      
    }

    tiles: Tile[] = [
      {hora: '08:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '08:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '09:00', cols: 1, rows: 1, color: 'reservado'},
      {hora: '09:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '10:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '10:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '11:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '11:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '12:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '12:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '13:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '13:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '14:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '14:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '15:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '15:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '16:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '16:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '17:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '17:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '18:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '19:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '20:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '20:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '21:00', cols: 1, rows: 1, color: 'libre'},
      {hora: '21:30', cols: 1, rows: 1, color: 'libre'},
      {hora: '22:00', cols: 1, rows: 1, color: 'libre'},
    ];

    //

  form: FormGroup;

  clientes : Cliente []=[];
  campoDeportivos   : CampoDeportivo []=[];
  estados  : Estado []=[];

  myControlCliente: FormControl = new FormControl();
  myControlCampoDeportivo: FormControl = new FormControl();
  myControlEstado:FormControl = new FormControl();


  //idClienteSeleccionado: number;
  //idCampoDeportivoSeleccionado: number;
  //idEstadoSeleccionado: number;

  //clienteSeleccionado : Cliente;
  //fechaSeleccionada: Date = new Date();
  //horaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();


  tiempo: string;
  precio: string;

  clienteSeleccionado : Cliente;
  campoDeportivoSeleccionado : CampoDeportivo;
  estadoSeleccionado:Estado;
  fechaSeleccionada: Date = new Date();




  filteredOptionsCliente: Observable<any[]>;
  filteredOptionsCampoDeportivo: Observable<any[]>;
  filteredOptionsEstado: Observable<any[]>;

  constructor(private clienteService:ClienteService, private campoDeportivoService:CampoDeportivoService, 
    private estadoService:EstadoService, private reservaService: ReservaService, private snackbar:MatSnackBar ) { }

  ngOnInit() {
    
this.form = new FormGroup({
'campoDeportivo': new FormControl,
'cliente': this.myControlCliente,
'fecha':new FormControl(new Date()),
'hora':new FormControl(new Date()),
'tiempo':new FormControl,
'precio':new FormControl,
'estado': new FormControl,
});
this.listaCampoDeportivo();
this.listaCliente();
this.listaEstado();
this.filteredOptionsCliente = this.myControlCliente.valueChanges.pipe(map(val => this.filterCliente(val)));

}
filterCliente(val: any) {

  console.log(val);
  if (val != null && val.idCliente > 0) {  //nroDocumento
    return this.clientes.filter(option =>
    option.nroDocumento.toLowerCase().includes(val.nroDocumento.toLowerCase()));

    //option.nombre.toLowerCase().includes(val.nombre.toLowerCase()) || option.apellidoPaterno.toLowerCase().includes(val.apellidoPaterno.toLowerCase())|| option.apellidoMaterno.toLowerCase().includes(val.apellidoMaterno.toLowerCase()));
 
  } else {
    return this.clientes.filter(option =>
      option.nroDocumento.toLowerCase().includes(val.toLowerCase()));
      //    option.nombre.toLowerCase().includes(val.toLowerCase()) || option.apellidoPaterno.toLowerCase().includes(val.toLowerCase()) || option.apellidoMaterno.toLowerCase().includes(val.toLowerCase()) );
  }
}

listaCampoDeportivo(){
this.campoDeportivoService.listar().subscribe(data =>{
    this.campoDeportivos= data;
})
}

listaCliente(){
this.clienteService.listar().subscribe(data =>{
  this.clientes = data;
})
}

listaEstado(){
this.estadoService.listar().subscribe(data =>{
  this.estados = data;
})
}

displayFnCliente(val: Cliente) {
  debugger;
  if(val.razonSocial==null){
    val.razonSocial="";
  }
  if(val.nombre==null && val.apellidoPaterno==null ){
    val.nombre="";
    val.apellidoPaterno="";
  }

  return val ? `${val.nombre} ${val.apellidoPaterno} ${val.razonSocial}` : val;
}

seleccionarCliente(e: any) {
  this.clienteSeleccionado = e.option.value;
}

aceptar(){
 // let campoDeportivo = new CampoDeportivo();
 // campoDeportivo.
 // campoDeportivo.idCampoDeportivo = this.idCampoDeportivoSeleccionado;

 // let cliente = new Cliente();
  //cliente.idCliente = this.idClienteSeleccionado;

 // let estado = new Estado();
  //estado.idEstado = this.idEstadoSeleccionado;

  let  reserva = new Reserva();
  reserva.campoDeportivo=this.form.value['campoDeportivo'];
  reserva.cliente =this.form.value['cliente'];
  reserva.estado=this.form.value['estado'];
  reserva.precio=this.form.value['precio'];
  reserva.tiempo=this.form.value['tiempo'];
  var tzoffset = (this.form.value['fecha']).getTimezoneOffset() * 60000;
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
  reserva.fecha = localISOTime;
  var tzoffset2 = (this.form.value['hora']).getTimezoneOffset() * 60000;
  var localISOTime2 = (new Date(Date.now() - tzoffset2)).toISOString()
  reserva.hora = localISOTime2;
  
  
    //IZO DATE
  //  let tzoffset2=(this.fechaSeleccionada).getTimezoneOffset()* 60000;
  //  let localISOTime2 =(new Date(Date.now() - tzoffset2)).toISOString();
  //  console.log(localISOTime2);
  //  reserva.hora=localISOTime; //yyyy-mm-ddTHH:mm:ss

    this.reservaService.registrar(reserva).subscribe(()=>{
      this.snackbar.open("se registro","aviso",{duration: 2000});
      
      setTimeout(() => {
      this.limpiarControles();
      }, 2000);
    })

}
limpiarControles(){
this.clientes=[];
this.campoDeportivos=[];
this.estados=[];
this.tiempo='';
this.precio='';
}
}
