import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';

const routes: Routes = [
  { path:'', component: AgendaListComponent },
  { path: 'agenda-form', component: AgendaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
