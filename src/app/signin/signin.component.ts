import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {user} from '../user/user.model';
import {SigninService} from './service/signinservice.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {

  socialuser!: SocialUser;
  loggedIn: boolean = false;

  public signin = this.formBuilder.group({
    email:'',
    password:''
  });

  constructor(private formBuilder: FormBuilder,private authService: SocialAuthService, private signinservice: SigninService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  onSubmit(): void {
    let signin:user = this.signin.value as user ; 
    if(signin.email !="" && signin.password!=""){
      this.signinservice.SaveSignin(signin).subscribe(x => {
        Swal.fire(
          'הרשמה בוצעה בהצלחה!',
          '',
          'success'
        )
      },
      err => {
        Swal.fire(
        err.error.auth
        )
      });
    }
  };
  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.socialuser = user;
      this.signinservice.SaveSignin(user).subscribe(x => {
        Swal.fire(
          'הרשמה בוצעה בהצלחה!',
          '',
          'success'
        )
      },
      err => {
        Swal.fire(
        err.error.auth
        )
      });

    });
  }

}
