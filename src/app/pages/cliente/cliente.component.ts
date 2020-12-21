import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/_model/cliente';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ClienteService } from 'src/app/_service/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns=['id','nroDocumento','razonSocial','apellidoPaterno','apellidoMaterno','nombre','celular','acciones'];
  @ViewChild(MatSort,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  cantidad: number = 0;
  constructor(private clienteService: ClienteService, private snackBar: MatSnackBar, public route:ActivatedRoute ) { }

  ngOnInit() {
    this.clienteService.clienteCambio.subscribe(data =>{
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    });

    this.clienteService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data , "AVISO",{
        duration:2000
      });
    });

   /*LISTA SIN PAGINADO
    this.clienteService.listar().subscribe(data => {
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    });
*/
    this.clienteService.listarPageable(0,10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource =new MatTableDataSource(data.content);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    });

  }
  mostrarMas(e:any){
    this.clienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data =>{
      this.cantidad= data.totalElements;
      this.dataSource =new MatTableDataSource(data.content);
      this.dataSource.sort= this.sort;
     // ya no es necesario carga la primera vez this.dataSource.paginator=this.paginator;
    }) ;
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(id: number){
    this.clienteService.eliminar(id).subscribe( () =>{ 
      this.clienteService.listar().subscribe(data =>{
        this.clienteService.clienteCambio.next(data);
        this.clienteService.mensajeCambio.next('Se elimino');
      })
    })
  }
}
