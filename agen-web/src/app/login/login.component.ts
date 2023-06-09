import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/core/service/agenda.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  clientId = environment.clientIdGoogle;

  constructor() { }

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
//        debugger;
      });
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    console.log(response);
    debugger;
    // await this.service.LoginWithGoogle(response.credential).subscribe(
    //   (x:any) => {
    //     this._ngZone.run(() => {
    //       this.router.navigate(['/logout']);
    //     })},
    //   (error:any) => {
    //       console.log(error);
    //     }
    //   );
  }
}



}
