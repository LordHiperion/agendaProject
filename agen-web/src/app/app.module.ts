import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaService } from 'src/core/service/agenda.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


  ],
  providers: [
    AgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
