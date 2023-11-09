import { HttpClient, HttpContext } from '@angular/common/http';
import { Component, Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../common-services';
import { AUTH_REQUIRED, AuthService } from '../security';

export abstract class RESTDAOService<T, K> {
  protected baseUrl = environment.apiURL;
  protected http = inject(HttpClient)

  constructor(entidad: string, protected option = {}) {
    this.baseUrl += entidad;
  }
  query(extras = {}): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.baseUrl, Object.assign({}, this.option, extras));
  }
  get(id: K, extras = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
  add(item: T, extras = {}): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, Object.assign({}, this.option, extras));
  }
  change(id: K, item: T, extras = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, Object.assign({}, this.option, extras));
  }
  remove(id: K, extras = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, Object.assign({}, this.option, extras));
  }
}

@Injectable({ providedIn: 'root' })
export class PersonasDAOService extends RESTDAOService<Persona, number>  {
  constructor() {
    super('personas', { context: new HttpContext().set(AUTH_REQUIRED, true) })
  }
  load(pagina: number = 0, filas = 10) {
    return this.http.get<any>(`${this.baseUrl}?_page=${pagina}&_rows=${filas}`, this.option)
  }
}

interface Persona {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  nif: string;
  edad: number;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  elemento: any = {}
  listado: Array<Persona> = []
  modo: 'add' | 'edit' = 'add'

  constructor(private dao: PersonasDAOService, private notify: NotificationService, public auth: AuthService) { }

  list() {
    this.dao.query().subscribe({
      next: data => this.listado = data,
      error: err => {
        // this.notify.add(JSON.stringify(err.error))
        this.notify.add(`Error ${err.status}: ${err.error.title}`)
      }
    })
  }
  load() {
    this.dao.load().subscribe({
      next: data => this.listado = data.content,
      error: err => {
        // this.notify.add(JSON.stringify(err.error))
        this.notify.add(`Error ${err.status}: ${err.error.title}`)
      }
    })
  }

  add() {
    this.elemento = {}
    this.modo = 'add'
  }
  edit() {
    this.dao.get(this.elemento.id).subscribe({
      next: data => {
        this.elemento = data
        this.modo = 'edit'
      },
      error: err => {
        // this.notify.add(JSON.stringify(err.error))
        this.notify.add(`Error ${err.status}: ${err.error.title}`)
      }
    })
    // this.elemento = { id: 1, nombre: 'Pepito', apellidos: 'Grillo', correo: 'pgrillo@example.com', nif: '12345678z', edad: 99 }
    // this.modo = 'edit'
  }
  cancel() {
    this.elemento = {}
  }
  send() {
    switch (this.modo) {
      case 'add':
        //alert(`POST ${JSON.stringify(this.elemento)}`)
        this.dao.add(this.elemento).subscribe({
          next: () => {
            this.cancel();
          },
          error: err => {
            this.notify.add(JSON.stringify(err.error))
            // this.notify.add(`Error ${err.status}: ${err.error.title}`)
          }
        })
        // this.cancel();
        break;
      case 'edit':
        this.dao.change(this.elemento.id, this.elemento).subscribe({
          next: () => {
            this.cancel();
          },
          error: err => {
            this.notify.add(JSON.stringify(err.error))
            // this.notify.add(`Error ${err.status}: ${err.error.title}`)
          }
        })
        // alert(`PUT ${JSON.stringify(this.elemento)}`)
        // this.cancel();
        break;
    }
  }
}
