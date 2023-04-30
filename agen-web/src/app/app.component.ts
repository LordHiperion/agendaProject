import { Component, OnInit } from '@angular/core';
import { get } from 'http';
import { observable } from 'rxjs';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private agendaService : AgendaService
  ){}

  ngOnInit(): void {

    this.agendaService.getAll().subscribe({
      next:(res) => {
        console.log(res)
      }

    })



  }
}

