import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.email]);
    submitMessage: String= null;
    registerMessage: String= null;
    constructor(private authService: AuthenticationService, private routerService: RouterService) {}
registerSubmit() {
      this.authService.registerUser({username: this.username.value, password: this.password.value, email: this.email.value}).subscribe(
      (data) => {
        console.log(data);
        if(data['userId'] === 0){
          this.registerMessage = 'username is already exist';
        } else {
           this.registerMessage ='Successfully registered, your user id is '+ data['userId'];
        }},
        (err) => {
          this.registerMessage = 'username, password and email are required';
      });     
}
    getUsernameErrorMessage() {
      return this.username.hasError('required') ? 'You must enter username !!!' : '';
    }
    getPasswordErrorMessage() {
      return this.password.hasError('required') ? 'You must enter password !!!' : '';
    }
    getEmailErrorMessage() {
      return this.email.hasError('required') ? 'You must enter email !!!' : '';
    }

    goToLogin() {
      this.routerService.routeToLogin();
  }
}
