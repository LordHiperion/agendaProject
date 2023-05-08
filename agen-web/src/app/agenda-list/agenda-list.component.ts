import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {

  constructor(
    private agendaService : AgendaService,
    private router : Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
