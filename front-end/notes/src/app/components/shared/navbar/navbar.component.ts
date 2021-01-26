import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlusSquare, fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotesService, Nota } from 'src/app/services/notes.service';
import { NotifierService } from "angular-notifier";
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  closeResult = '';
  name: string = '';
  note: string = '';
  private readonly notifier: NotifierService;
  isLoggedIn$: Observable<boolean>;    

  constructor(
    private router: Router, library: FaIconLibrary,
    private modalService: NgbModal, private _notasService: NotesService,
    private notifierService: NotifierService,
    private authService: AuthService) {
    library.addIconPacks(far);
    library.addIcons(faPlusSquare);
    this.notifier = notifierService;
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  buscarNota(termino: string) {
    console.log(termino);
    this.router.navigate(['/buscar', termino]);
  }

  anadirNota(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.name)
      console.log(this.note)
      //Guardar nota
      let newNota: Nota = {
        nombre: this.name,
        text: this.note,
        fecha: new Date().toString()
      }
      this._notasService.addNota(newNota).subscribe(nota => {
        this.notifier.notify('success', 'Se agregó la nota.');
        this.clean();
      },
        err => {
          this.notifier.notify('error', 'Ocurrió un error, inténtalo nuevamente.');
        })
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.clean();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  clean() {
    this.name = '';
    this.note = '';
  }

  onLogout(){
    this.authService.logout(); 
  }

}
