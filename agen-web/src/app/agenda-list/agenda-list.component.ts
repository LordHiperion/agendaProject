import { ChangeDetectorRef, Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent{

  //criando atributo para exibir a lista
  exibirLista : any;
  idContatoDelete?: number;

  constructor(
    private agendaService : AgendaService,
    private router : Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,

  ) {

    this.carregarLista();

   }



// metodo que faz a requisição de exibir lista e pega o retorno no getall configurado no agenda.service.
  carregarLista () {
    this.agendaService.getAll().subscribe({
      // se a requisição funcionar ele entra no next e o res será o valor que virá da requisição. Obs: o res pode levar qualquer nome porem é utilizado res de response.
      next: (res) => {
        this.exibirLista = res

        this.ref.detectChanges();

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

irParaCadastroDeContato() {
  this.router.navigate(['/agenda-form']);
}

cadastrarContato(id: number){
  this.router.navigate(['/agenda-form', id, 'visualizar']);
}

editarContato(id: number){
  this.router.navigate(['/agenda-form', id]);
}

setIdContatoDelete(id: number){
  this.idContatoDelete = id;
}

deletarContato(){
  if (!this.idContatoDelete)
  return;
  this.agendaService.delete(this.idContatoDelete).subscribe({
    next:(res) => {
      this.idContatoDelete = undefined;
      this.carregarLista();
    },
    error: (err) => {
      console.error(err);
    }
  });
}


}
