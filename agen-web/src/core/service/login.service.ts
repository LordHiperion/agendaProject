import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  uri = environment.backEndEndereco;
constructor(
  private http: HttpClient
) { }
login (token:string) {
  const headers= new HttpHeaders({"Authorization": `Bearer ${token}`});

  return this.http.post(`${this.uri}/login.php`,{},{headers : headers});
}
}
