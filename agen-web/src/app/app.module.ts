import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaService } from 'src/core/service/agenda.service';
import { HttpClientModule } from '@angular/common/http';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaListComponent } from './agenda-list/agenda-list.component';

@NgModule({
  declarations: [				
    AppComponent,
      AgendaFormComponent,
      AgendaFormComponent,
      AgendaListComponent,
      AgendaListComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,


  ],
  providers: [
    AgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
