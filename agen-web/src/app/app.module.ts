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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorModule } from './interceptor/interceptor.module';
import { NgxMaskModule } from 'ngx-mask';
import { ToastService } from 'src/core/service/toast.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
      AgendaFormComponent,
      AgendaListComponent,
      LoginComponent,
      LogoutComponent,


   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    InterceptorModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),





  ],
  providers: [
    AgendaService,
    ToastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
