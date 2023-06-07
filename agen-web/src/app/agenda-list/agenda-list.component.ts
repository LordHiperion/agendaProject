import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {

  //criando atributo para exibir a lista
  exibirLista : any;

  constructor(
    private agendaService : AgendaService,
    private router : Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.carregarLista();

  }

// metodo que faz a requisição de exibir lista e pega o retorno no getall configurado no agenda.service.
  carregarLista () {
    this.agendaService.getAll().subscribe({
      // se a requisição funcionar ele entra no next e o res será o valor que virá da requisição. Obs: o res pode levar qualquer nome porem é utilizado res de response.
      next: (res) => {
        this.exibirLista = res
        console.log(res)
      },
      //Só entrara no error se der erro na requisição. obs: erro na requisição é qualquer status 4xx ou 5xx.
      error: (err) => {
        console.error(err)

      },
      //Complete sempre será executado depois do next, se cair no error o complete não será chamado. OBS: pouco usado no mercado de trabalho
      complete:() => {

      }
    })
  }
}
