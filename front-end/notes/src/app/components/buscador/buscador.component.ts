import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

  notas: any[] = []
  termino: string;

  constructor(private activatedRoute: ActivatedRoute, private _notasService: NotesService) {
    this.termino = '';
  }

  async ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      this.termino = params['termino'];
      this.notas = await this._notasService.buscarNotas(this.termino);
      console.log(this.notas);
    });

  }

}