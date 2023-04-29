import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";
import {user} from '../user/user.model';
import {loginservice} from './service/login.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: SocialUser;



  constructor(private formBuilder: FormBuilder,
     private authService: SocialAuthService,
      private loginservice: loginservice,
      private router: Router,
      private route: ActivatedRoute,) { }

  public login = this.formBuilder.group({
    email:'',
    password:''
  });


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
    let login: user = this.login.value as user;
    localStorage.setItem('user_email', login.email);

    this.loginservice.getUserByEmail(login.email).subscribe(userObject => {
      if (userObject) {
        localStorage.setItem('user', JSON.stringify(userObject));
      }
    });

    this.loginservice.login(login).subscribe(x => {
      this.router.navigate(['/personal-area']);
      this.loginservice.setSession(x);
      Swal.fire(
        'כניסה בוצעה בהצלחה!',
        '',
        'success'
      )
    },
    err => {
      Swal.fire(
      err.error.auth
      )
    });
  };

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      localStorage.setItem('user_email', user.email);
      this.loginservice.getUserByEmail(user.email).subscribe(userObject => {
        if (userObject) {
          localStorage.setItem('user', JSON.stringify(userObject));
        }
      },(err)=>{
        console.log(err);
      });
      this.loginservice.login(user).subscribe(x => {
        this.router.navigate(['/personal-area']);
        this.loginservice.setSession(x);
        Swal.fire(
          'כניסה בוצעה בהצלחה!',
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
    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }
}
