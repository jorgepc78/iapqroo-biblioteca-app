import { Injectable              } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment             } from '../../../environments/environment';
import { Observable              } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ConsultaLibrosService {

  private headers_get = new Headers({ 'Content-Type': 'text/plain' });
  private headers_post = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http
  ) { }


  getCategLibros(): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));

    return this.http
      .get(environment.apiUrl + 'Libros/categorias_total?access_token=' + token.id, { headers: this.headers_get })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  getTotalLibros(condicion: any): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    return this.http
      .get(environment.apiUrl + 'Libros/count?where=' + JSON.stringify(condicion) + '&access_token=' + token.id, { headers: this.headers_get })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  getListaLibros(condicion: any, registrosPorPagina: number, paginaActual: number): Observable<any> {

    let token = JSON.parse(localStorage.getItem('token'));
    let skip = (paginaActual - 1) * registrosPorPagina;

    let filter = {
      where: condicion,
      order: ["nombre ASC"],
      include: ["categoria_pertenece"],
      limit: registrosPorPagina,
      skip: skip
    };

    return this.http
      .get(environment.apiUrl + 'Libros/?filter=' + JSON.stringify(filter) + '&access_token=' + token.id, { headers: this.headers_get })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }


}
