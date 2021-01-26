import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  private notas: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public notas$: Observable<any[]> = this.notas.asObservable();

  private Notas: Nota[] = [];
  notasUrl = 'http://localhost:49160/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    console.log("Servicio listo para usar!!!");
  }

  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.notasUrl)
      .pipe(
        tap(notas => this.notas.next(notas))
        , catchError(this.handleError<Nota[]>('getNotas', []))
      );
  }

  getNota(id: number): Observable<Nota> {
    const url = `${this.notasUrl}notes/${id}`;
    return this.http.get<Nota>(url).pipe(
      catchError(this.handleError<Nota>(`getNota id=${id}`))
    );
  }

  addNota(newNote: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.notasUrl, newNote)
      .pipe(
        tap(res => {
          this.notas
            .pipe(take(1))
            .subscribe(notas => {
              newNote = (<any>res).note;
              this.notas.next([...notas, newNote])
            })
          console.log(res);
        })
        , catchError(this.handleError('addNota', newNote))
      );
  }

  eliminarNota(id: number): Observable<unknown> {
    const url = `${this.notasUrl}notes/${id}`;
    return this.http.delete(url)
      .pipe(
        tap(_ => {
          const arrNotes = this.notas.getValue();
          arrNotes.forEach((item, index) => {
            if (item.id == id) {
              arrNotes.splice(index, 1);
            }
          })
          this.notas.next(arrNotes);
        })
        , catchError(this.handleError('deleteNota'))
      );
  }

  async buscarNotas(termino: string) {
    let notasArr: Nota[] = [];
    let notas = await this.getNotas().toPromise();
    console.log(notas)

    termino = termino.toLowerCase();

    for (let i = 0; i < notas.length; i++) {

      let nota = notas[i];
      let nombre = nota.nombre.toLowerCase();
      let texto = nota.text.toLowerCase();
      if (nombre.indexOf(termino) >= 0 || texto.indexOf(termino) >= 0) {
        nota.id = i;
        notasArr.push(nota)
      }
    }
    return notasArr;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      throw new Error("Error en la consulta");
      return of(result as T);
    };
  }

}


export interface Nota {
  nombre: string;
  text: string;
  img?: string;
  fecha?: string;
  casa?: string;
  id?: any;
};
