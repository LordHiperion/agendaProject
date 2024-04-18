import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';
import { IFormArray, IFormBuilder } from '@rxweb/types';
import { ToastrService } from 'ngx-toastr';


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
    private toastr: ToastrService,
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

    const isVisualizar = this.tipo == 'visualizar';

    if (isVisualizar){
      this.agendaForm.disable();
    }
    if (this.idContato >= 1) {

      this.pegarContato(this.idContato);

    }
    if (isVisualizar){
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
          for (const telefone of res.telefones) {
           // for of é um for inteligente no qual ele passa pela lista e pega objeto que está sendo solicitado.
           //ele faz esse processo até terminar a lista.
            this.adicionarTelefone(telefone.numero)
          }
        }, error: (err) => {
          this.toastr.error('Pessoa não encontrada');

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
          this.toastr.success('pessoa atualizada com sucesso');
          this.voltarParaOListarContato();
        }, error: (err) => {
          console.error(err);
          this.toastr.error('Erro ao Atualizar');
        }
      })
    }else{

      this.agendaService.cadastrar(this.agendaForm.value).subscribe({
        next:(res) => {
          this.toastr.success('Pessoa cadastrada com sucesso');
          this.voltarParaOListarContato();
        },
        error: (err) => {
          this.toastr.error('Erro ao Cadastrar');
          console.error(err);
        }

      });
    }
  }

 get telefones(){
  return this.agendaForm.controls["telefones"] as unknown as FormArray;

 }

  adicionarTelefone(numero? : number){
  this.telefones.push((this.formbuilder as FormBuilder).group<ListaTelefoneForm>({
    numero: [{
      value:numero || null,
      disabled: 'visualizar' == this.tipo,
    }]
  }))
  }

  excluirNumero(index:number):void{
     this.telefones.removeAt(index);
  }



}
