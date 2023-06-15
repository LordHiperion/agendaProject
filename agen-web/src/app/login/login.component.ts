import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { AgendaService } from 'src/core/service/agenda.service';
import { AuthService } from 'src/core/service/auth.service';
import { LoginService } from 'src/core/service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  clientId = environment.clientIdGoogle;

  constructor(
    private loginService : LoginService,
    private authService : AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
//        access_type: 'off',
//        prompt: 'consent'
      });
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%", access_type: "off", prompt: "consent" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {
        console.log(notification);

      });
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    console.log(response);

    this.loginService.login(response.credential).subscribe(
      {
        next: (res) => {
         this.authService.setToken(response.credential);

         this.router.navigate(['/agenda-list']);
        }

      }
    );



  }
}




