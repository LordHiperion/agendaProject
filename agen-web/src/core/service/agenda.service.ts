import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class AgendaService {

constructor(private http: HttpClient) { }

getAll(): Observable<any>{
  return this.http.get ('https://whertz.com.br/agenda_projeto/')
}

}
