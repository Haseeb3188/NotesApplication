import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
import { SharedService } from '../services/shared.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  isUserLoggedIn = false;
  constructor (private routerService: RouterService, private ss: SharedService, private authenticationService: AuthenticationService ) {
    
  }
  ngOnInit() {
    this.isUserLoggedIn = this.ss.getEmittedValue()
      .subscribe(item => this.isUserLoggedIn=item);  }


  switchToListView() {
    this.isNoteView = false;
    this.routerService.routeToListView();
  }
  switchToNoteView() {
    this.isNoteView = true;
    this.routerService.routeToNoteView();
  }
  logout() {
    this.isUserLoggedIn = false;
    this.authenticationService.removeLoginInfo();
    this.routerService.routeToLogin();
  }
  goToLogin() {
    this.isUserLoggedIn = false;
    this.routerService.routeToLogin();
  }
  goToDashboard() {
    this.isUserLoggedIn = false;
    this.routerService.routeToDashboard();
  }
  goToUpload() {
    this.isUserLoggedIn = true;
    this.routerService.routeToUpload();
  }
}
