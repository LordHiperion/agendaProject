import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'http';
import { observable } from 'rxjs';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private router : Router,
    private _http:HttpClient
    ){}
    getStarWarsAPI() {
      return this._http
        .get(' https://whertz.com.br/agenda_projeto/agenda_controller.php')
        .subscribe(data => {
          console.log(data);
        });
      }

    ngOnInit(): void {}


    }


