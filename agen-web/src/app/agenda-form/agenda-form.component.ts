import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';
import { IFormArray, IFormBuilder } from '@rxweb/types';


export interface ListaTelefoneForm{
  numero: number | any;
}
@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

  agendaForm: FormGroup;
  idContato: number = 0;
  tipo: any;
  title = 'Cadastrar Agenda'


  constructor(
    private agendaService : AgendaService,
    private router : Router,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
  ) {
    // formgroup é um gerenciador de formulário completo do angular.
    //this.agendaForm = new FormGroup({

    //formcontrol vem dentro do formgroup e é utilizado para setar a estrutura do formgroup.


      // nome: new FormControl(null, [Validators.required]),
      // sobreNome: new FormControl(null),
      // email: new FormControl(null),
      // dataAniversario: new FormControl(null),
      // observacao: new FormControl(null),
      // telefones:(this.formbuilder as FormBuilder).array<ListaTelefoneForm>([]),
      // telefones: IFormArray< ListaTelefoneForm >


      // TODO: Procurar na internet como adicionar e remover input dinamicamente no FormGroup. Para o telefone

    //})
    this.agendaForm = (formbuilder as IFormBuilder).group<any>({

      nome:[null,Validators.required],
      sobreNome: [null],
      email: [null],
      dataAniversario: [null],
      observacao: [null],
      telefones:(this.formbuilder as IFormBuilder).array<ListaTelefoneForm>([]),

    })






    this.idContato = (+this.route.snapshot.params['id']) ? +this.route.snapshot.params['id'] : 0;
    this.tipo = this.route.snapshot.params['tipo'];

    if (this.tipo == 'visualizar'){
      this.agendaForm.disable();
    }
    if (this.idContato >= 1) {
      console.log("numero1")
      this.pegarContato(this.idContato);

    }
    if (this.tipo == 'visualizar'){
    this.title = 'Visualizar Agenda'
    }else if (this.tipo == 'editar')
    this.title = 'Editar Agenda'
  }

  ngOnInit() {}

//metodo criado para poder fazer a utilização de um atalho na pagina.
  voltarParaOListarContato() {
    this.router.navigate(['/agenda-list']);
    }

    pegarContato(id: number){
      this.agendaService.getOne(id).subscribe({
        next: ( res ) => {
          this.agendaForm.patchValue(res);
        }, error: (err) => {

        }
      })
    }

  salvarContato(){

    if (this.agendaForm.invalid){
      return;
    }

    const nomeForm = this.agendaForm.get('nome')?.value;
    this.agendaForm.get('nome')?.setValue(nomeForm.trim());

    const sobreNomeForm = this.agendaForm.get('sobreNome')?.value;
    this.agendaForm.get('sobreNome')?.setValue(sobreNomeForm.trim());


    if(this.idContato > 0) {
      this.agendaService.atualizar(this.idContato, this.agendaForm.value).subscribe({
        next: (res) => {
          console.log ('pessoa atualizada com sucesso');
          this.voltarParaOListarContato();
        }, error: (err) => {
          console.error(err);
        }
      })
    }else{

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

 get telefones(){
  return this.agendaForm.controls["telefones"] as unknown as FormArray;

 }

  adicionarTelefone(){
  this.telefones.push((this.formbuilder as FormBuilder).group<ListaTelefoneForm>({
    numero: [null],
  }))
  }

  excluirNumero(index:number):void{
     this.telefones.removeAt(index);
  }



}
