import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { NotesService } from '../../services/notes.service';
import { NotifierService } from "angular-notifier";


@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html'
})
export class NotaComponent implements OnInit {

  nota: any = {};
  id: any;


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private _notasService: NotesService,
    private notifierService: NotifierService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getNota();
  }

  getNota() {
    console.log(this.id)
    this._notasService.getNota(this.id)
      .subscribe(nota => this.nota = nota);
  }

  eliminarNota() {
    this._notasService.eliminarNota(this.id)
      .subscribe(_ => {
        this.notifierService.notify('success', 'Nota eliminada.');
        this.router.navigateByUrl('/notas');
      })
  }


}
