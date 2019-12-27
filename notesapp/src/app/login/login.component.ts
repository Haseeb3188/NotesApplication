import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    submitMessage: String= null;
    registerMessage: String= null;
    constructor(private authService: AuthenticationService, 
                private routerService: RouterService , 
                private ss: SharedService) {}
    ngOnInit() {}
    loginSubmit() {
      this.authService.authenticateUser({username: this.username.value, password: this.password.value}).subscribe(
      (data) => {
          this.authService.setBearerToken(data['token']);
          this.authService.setUserId(data['user'].userId);
          this.routerService.routeToDashboard();
          this.ss.change();
        }, (err) => {
          if (err.status === 403) {
          this.submitMessage = "You are not a register user!!";
          this.registerMessage = "Click on the register button to register";
        } else {
          this.submitMessage = err.message;
        }
      });
}

    goToRegister() {
        this.routerService.routeToRegister();
    }

    getUsernameErrorMessage() {
      return this.username.hasError('required') ? 'You must enter username !!!' : '';
    }
    getPasswordErrorMessage() {
      return this.password.hasError('required') ? 'You must enter password !!!' : '';
    }
}
