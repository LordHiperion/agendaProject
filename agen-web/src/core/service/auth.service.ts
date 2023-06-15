import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
   ) { }

setToken (token : string){
  sessionStorage.setItem ('token',token);
}

getToken (){
  return sessionStorage.getItem ('token');

}

clearToken(){
  sessionStorage.removeItem ('token');
}
}
