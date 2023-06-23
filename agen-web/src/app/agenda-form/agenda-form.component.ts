import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

  agendaForm: FormGroup;


  constructor(
    private agendaService : AgendaService,
    private router : Router,
    private route: ActivatedRoute,
  ) {
    // formgroup é um gerenciador de formulário completo do angular.
    this.agendaForm = new FormGroup({

    //formcontrol vem dentro do formgroup e é utilizado para setar a estrutura do formgroup.


      nome: new FormControl(null, [Validators.required]),
      sobreNome: new FormControl(null),
      email: new FormControl(null),
      dataAniversario: new FormControl(null),
      observacao: new FormControl(null),

    })
  }

  ngOnInit() {}

//metodo criado para poder fazer a utilização de um atalho na pagina.
  voltarParaOListarContato() {
    this.router.navigate(['/agenda-list']);
    }

  salvarContato(){

    if (this.agendaForm.invalid){
      return;
    }
    this.agendaService.cadastrar(this.agendaForm.value).subscribe({
      next:(res) => {
        this.voltarParaOListarContato();
      },
      error: (err) => {
        console.error(err);
      }

    });
  }


}
