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
    private router : Router
    ){}

    ngOnInit(): void {}
//metodo criado para fazer a navegação do botao para a agenda-list.
    irParaAgendaList() {
      this.router.navigate(['agenda-list']);

    }
}

