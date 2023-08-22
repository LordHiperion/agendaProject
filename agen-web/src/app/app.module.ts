import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaService } from 'src/core/service/agenda.service';
import { HttpClientModule } from '@angular/common/http';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorModule } from './interceptor/interceptor.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
      AgendaFormComponent,
      AgendaListComponent,
      LoginComponent,
      LogoutComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InterceptorModule,
    NgxMaskModule.forRoot()


  ],
  providers: [
    AgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
