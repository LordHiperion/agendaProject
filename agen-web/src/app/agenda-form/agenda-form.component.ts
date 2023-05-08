import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

  constructor(
    private agendaService : AgendaService,
    private router : Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
