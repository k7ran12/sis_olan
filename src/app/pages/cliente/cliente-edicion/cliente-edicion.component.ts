
import { MatSnackBar } from '@angular/material';
import { TipoclienteService } from 'src/app/_service/tipocliente.service';
import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { Component, OnInit } from '@angular/core';
import { TipoCliente } from 'src/app/_model/tipocliente';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {

  tipoDocumentos : TipoDocumento []=[]
  tipoClientes : TipoCliente []=[]

  idTipoDocumentoSeleccionado: number;
  idTipoClienteSeleccionado: number;

  //fechaSeleccionada: Date = new Date();

  valorTipoDocu: number;

  nroDocumento: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial : string;
  celular: string;
  estado: string;
  //idEstadoSeleccionado: string;

  flagTipoDocumentoGeneral: boolean=true;
  flagTipoDocumentoRuc:boolean=true;

  id : number;
  edicion: boolean;

  constructor(private tipoDocumentoService:TipodocumentoService,private route: ActivatedRoute, private router:Router,private tipoClienteService: TipoclienteService, private clienteService: ClienteService, private snackbar:MatSnackBar ) { }
//private data:Cliente 
  ngOnInit() {

    this.listaTipoDocumento();
    this.listaTipoCliente();
   // this.validarDocumento();

   this.route.params.subscribe( (data: Params) =>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init02();
   });
    
  }
  init02(){
    debugger;
    if(this.edicion){
      this.clienteService.listarPorId(this.id).subscribe(data => {
        //recuperando la lista del servicio listar por id unico
        this.nroDocumento=data.nroDocumento;
        this.nombre=data.nombre;
        this.apellidoPaterno=data.apellidoPaterno;
        this.apellidoMaterno=data.apellidoMaterno;
        this.razonSocial=data.razonSocial;
        this.celular=data.celular;
        this.idTipoClienteSeleccionado=data.tipoCliente.id;
        this.idTipoDocumentoSeleccionado=data.tipoDocumento.id;


        switch (this.idTipoDocumentoSeleccionado) {
          case 1 :
                this.flagTipoDocumentoRuc=false
                this.flagTipoDocumentoGeneral=true
                break;
          case 2 :
                this.flagTipoDocumentoGeneral=false
                this.flagTipoDocumentoRuc=true
                break;
          default:
                  console.log("No such day exists!");
                  break;      
        }
        /*
          //SI ES TIPO DE DOCUMENTO RUC
        if(this.idTipoDocumentoSeleccionado==1){
          this.flagTipoDocumentoRuc=false
          this.flagTipoDocumentoGeneral=true
        }
        //SI ES TIPO DE DOCUMENTO DNI
        if(this.idTipoDocumentoSeleccionado==2){
          this.flagTipoDocumentoGeneral=false
          this.flagTipoDocumentoRuc=true
        }

        */
      });
    }

  
  }
  listaTipoDocumento(){

    this.tipoDocumentoService.listar().subscribe(dataDocumento=>{
      this.tipoDocumentos= dataDocumento;
    })

   // this.validarDocumento();
  }

  onChangeTown(event): void {

    const selectedTown = event;
    console.log('selectedTown: ', selectedTown);
    this.valorTipoDocu=selectedTown;


    //SI ES TIPO DE DOCUMENTO RUC
    if(this.valorTipoDocu==1){
      this.flagTipoDocumentoRuc=false
      this.flagTipoDocumentoGeneral=true
    }
    //SI ES TIPO DE DOCUMENTO DNI
    if(this.valorTipoDocu==2){
      this.flagTipoDocumentoGeneral=false
      this.flagTipoDocumentoRuc=true
    }
  }



  listaTipoCliente(){
    this.tipoClienteService.listar().subscribe(data=>{
      this.tipoClientes= data;
    })
  }

guardar(){

  let tipoDocumento = new TipoDocumento();
  tipoDocumento.id = this.idTipoDocumentoSeleccionado;
  let tipoCliente = new TipoCliente();
  tipoCliente.id= this.idTipoClienteSeleccionado


  let cliente = new Cliente();
  cliente.tipoDocumento=tipoDocumento;
  cliente.tipoCliente=tipoCliente;
  cliente.nroDocumento= this.nroDocumento;
  cliente.nombre =this.nombre;
  cliente.apellidoPaterno =this.apellidoPaterno;
  cliente.apellidoMaterno=this.apellidoMaterno;
  cliente.razonSocial=this.razonSocial;
  cliente.celular= this.celular;
  //cliente.estado=this.idEstadoSeleccionado;
/*
  IZO DATE
let tzoffset=(this.fechaSeleccionada).getTimezoneOffset()* 60000;
let localISOTime =(new Date(Date.now() - tzoffset)).toISOString();
console.log(localISOTime);
cliente.fechaRegistro=localISOTime; //yyyy-mm-ddTHH:mm:ss
*/
debugger;
if(this.edicion){
  cliente.id=this.id;
  

  this.clienteService.modificar(cliente).pipe(switchMap (()=>{
    return this.clienteService.listar();
    })).subscribe(data => {
      this.clienteService.clienteCambio.next(data);
      this.snackbar.open("se modifico","aviso",{duration: 2000});
      setTimeout(() => {
      this.limpiarControles();
    }, 2000);
  });

}else{
  this.clienteService.registrar(cliente).pipe(switchMap (()=>{
    return this.clienteService.listar();
    })).subscribe(data => {
      this.clienteService.clienteCambio.next(data);
      this.snackbar.open("se registro","aviso",{duration: 2000});
      setTimeout(() => {
      this.limpiarControles();
    }, 2000);
  });
  

}

this.router.navigate(['cliente']);

}

limpiarControles(){
this.idTipoClienteSeleccionado=0; 
this.idTipoDocumentoSeleccionado=0;
this.nroDocumento = null ;
this.nombre="";
this.apellidoPaterno="";
this.apellidoMaterno="";
this.razonSocial="";
this.celular="";
/*
this.idEstadoSeleccionado="";
this.fechaSeleccionada = new Date();
this.fechaSeleccionada.setHours(0);
this.fechaSeleccionada.setMinutes(0);
this.fechaSeleccionada.setSeconds(0);
this.fechaSeleccionada.setMilliseconds(0);
*/
}

}
