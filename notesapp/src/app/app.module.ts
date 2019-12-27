import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule , Routes } from '@angular/router';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';

import { HttpClientModule } from '@angular/common/http';
import { NotesService} from './services/notes.service';
import { RouterService } from './services/router.service';
import { SharedService } from './services/shared.service';
import { AuthenticationService } from './services/authentication.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { UploadComponent } from './upload/upload.component';


 const appRouter: Routes = [
  { path: '' , redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview' ,
        component: NoteViewComponent
      },
      {
        path: `view/listview` ,
        component: ListViewComponent
      },
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: `note/:noteId/edit` ,
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  },

  {
    path: 'register',
    component: RegisterComponent
  },
  {
  path: 'upload',
  component: UploadComponent
  }
];

@NgModule({
  declarations: [ AppComponent,
                HeaderComponent,
                LoginComponent,
                DashboardComponent,
                NoteViewComponent,
                NoteTakerComponent,
                ListViewComponent,
                NoteComponent,
                EditNoteOpenerComponent,
                EditNoteViewComponent,
                RegisterComponent,
                UploadComponent
                ],
  imports: [BrowserModule,
            MatToolbarModule,
            MatExpansionModule,
            BrowserAnimationsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatCheckboxModule,
            MatCardModule,
            MatSnackBarModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatSelectModule,
            RouterModule.forRoot(appRouter),
            ],
  providers: [ NotesService,
               RouterService,
               AuthenticationService,
               CanActivateRouteGuard,
               SharedService ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})
export class AppModule { }
