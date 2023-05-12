import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', redirectTo: 'login'},
  { path: 'agenda-form', component: AgendaFormComponent },
  { path: 'agenda-list', component: AgendaListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
