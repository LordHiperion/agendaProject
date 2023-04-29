import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private agendaService : AgendaService
  ){}

  ngOnInit(): void {

  }
}

