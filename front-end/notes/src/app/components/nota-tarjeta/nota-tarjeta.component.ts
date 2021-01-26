import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota-tarjeta',
  templateUrl: './nota-tarjeta.component.html'
})
export class NotaTarjetaComponent implements OnInit {

  @Input() nota: any = {};
  @Input() index: number= 0;

  @Output() notaSeleccionada: EventEmitter<number>;

  constructor(private router: Router) {
    this.notaSeleccionada = new EventEmitter();
  }

  ngOnInit() {
  }

  vernota() {
    // console.log(  this.index );
    //this.router.navigate( ['/nota', this.index] );
    this.notaSeleccionada.emit( this.index );
  }

}
