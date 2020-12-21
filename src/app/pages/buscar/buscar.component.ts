import { UtilService } from './../../_service/util.service';
import { ReservaService } from './../../_service/reserva.service';
import { Reserva } from './../../_model/reserva';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FiltroReservaDTO } from 'src/app/_dto/filtroReservaDTO';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  displayedColumns = ['cliente', 'campoDeportivo', 'fecha', 'hora','tiempo','precio','estado','acciones'];
  dataSource: MatTableDataSource<Reserva>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  progress: boolean = false;

  constructor(private reservaService: ReservaService, private utilService: UtilService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nroDocumento': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaReserva': new FormControl()
    });
    this.utilService.estadoProgress.subscribe(data => {
      this.progress = data;
    });
  }

  buscar() {
    let filtro = new FiltroReservaDTO(this.form.value['nroDocumento'], this.form.value['nombreCompleto'], this.form.value['fechaReserva']);
    filtro.nombreCompleto = filtro.nombreCompleto.toLowerCase();

    this.utilService.estadoProgress.next(true);

    setTimeout(() => {

    }, 2000);

    if (filtro.fechaReserva) {

      delete filtro.nroDocumento;
      delete filtro.nombreCompleto;

      console.log(filtro);

      this.reservaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.utilService.estadoProgress.next(false);
      });
    } else {
      delete filtro.fechaReserva;

      if (filtro.nroDocumento === null) {
        delete filtro.nroDocumento;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto
      }

      console.log(filtro);
      this.reservaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.utilService.estadoProgress.next(false);
    }
    
  }


}
