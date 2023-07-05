import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class AgendaService {

constructor(private http: HttpClient) { }

getAll(): Observable<any>{
  return this.http.get ('https://whertz.com.br/agenda_projeto/agenda_controller.php' )
}

cadastrar(agenda: any) {

  return this.http.post('https://whertz.com.br/agenda_projeto/agenda_controller.php', agenda);

}

}
