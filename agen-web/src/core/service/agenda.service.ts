import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class AgendaService {

constructor(private http: HttpClient) { }

getAll(): Observable<any>{
  const token = sessionStorage.getItem('token');
  const headers= new HttpHeaders({"Authorization": `Bearer ${token}`});
  return this.http.get ('https://whertz.com.br/agenda_projeto/agenda_controller.php', {headers : headers})
}

cadastrar(agenda: any) {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({"Authorization": `Bearer ${token}`});
  return this.http.post('https://whertz.com.br/agenda_projeto/agenda_controller.php', agenda, {headers : headers});

}

}
