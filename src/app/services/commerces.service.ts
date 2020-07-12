import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommercesService {
  public url: string;
  public controller: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.url;
    this.controller = 'commerces/';
  }

  getCommerces(): Observable<any> {
    const json = this.http.get(this.url + this.controller);
    return json;
  }

  getLayer(): Observable<any> {
    const json = this.http.get(this.url + this.controller + 'layer');
    return json;
  }

  getGraph(): Observable<any> {
    const json = this.http.get(this.url + this.controller + 'graph');
    return json;
  }
}
