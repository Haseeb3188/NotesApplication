import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {
  constructor(private router: Router, private location: Location) {}

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToRegister() {
    this.router.navigate(['register']);
  }
  routeToLogin() {
    return this.router.navigate(['login']);
  }
  routeToUpload() {
    return this.router.navigate(['upload']);
  }

  routeToEditNoteView(noteId) {
    this.router.navigate([
      'dashboard', {
        outlets: {
          'noteEditOutlet': [
            'note', noteId, 'edit'
          ]
      }
      }
    ]);
  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    return this.router.navigate(['dashboard/view/noteview']);
  }

  routeToListView() {
    return this.router.navigate(['dashboard/view/listview']);
  }
}
