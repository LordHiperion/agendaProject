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

getOne(id: number): Observable<any>{
  return this.http.get(`https://whertz.com.br/agenda_projeto/agenda_controller.php/${id}`);
}

delete(id: number){
  return this.http.delete(`https://whertz.com.br/agenda_projeto/agenda_controller.php/${id}`);
}

cadastrar(agenda: any) {
  return this.http.post('https://whertz.com.br/agenda_projeto/agenda_controller.php', agenda);
}

atualizar(id: number, agenda: any){
  return this.http.put(`https://whertz.com.br/agenda_projeto/agenda_controller.php/${id}`, agenda);
}

}
