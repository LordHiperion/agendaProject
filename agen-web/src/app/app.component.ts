import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { get } from 'http';
import { observable } from 'rxjs';
import { AgendaService } from 'src/core/service/agenda.service';
import { AuthService } from 'src/core/service/auth.service';
import { LoginService } from 'src/core/service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  clientId = environment.clientIdGoogle;


  constructor(
    private router : Router,
    private _http:HttpClient,
    private loginService : LoginService,
    private authService : AuthService,
    private ngZone : NgZone
    ){}

    ngOnInit(): void {}

    getStarWarsAPI() {
      return this._http
        .get(' https://whertz.com.br/agenda_projeto/agenda_controller.php')
        .subscribe(data => {
          console.log(data);
        });
      }




    }


