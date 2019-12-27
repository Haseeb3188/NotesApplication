import { Component, OnInit } from '@angular/core';
import { NotesService} from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
import { Note } from '../note';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  notes: Array<Note>;
  notesBackup: Array<Note>;
  errMessage:string;
  searchKey:string ='';
  keypressed:boolean=false;
  receiverEmail = new FormControl('', [Validators.email]);
  selectedNotes: Array<Note>;
  selectedFile: File;
  bulkNotes: Array<Note>;
  batch: Array<Note>;
  batchCount:number = 10;
  snackDuration = 5000;
  constructor(private noteService: NotesService,private authService: AuthenticationService, private _snackBar: MatSnackBar) {}
  ngOnInit() {
      this.noteService.getNotes().subscribe(
      data => this.notes= data,
      err => {this.errMessage = err.message, this._snackBar.open(this.errMessage, 'Thanks!!', {
                  duration: this.snackDuration,
                });}
      );
      }

  onFileChanged(event) {
  this.selectedFile = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(this.selectedFile, "UTF-8");
  fileReader.onload = () => {
    this.bulkNotes = JSON.parse(fileReader.result);
    console.log(JSON.parse(fileReader.result));
  }
  fileReader.onerror = (error) => {
    this.errMessage = error.message;
     this._snackBar.open(this.errMessage, 'Thanks!!', {
                  duration: this.snackDuration,
                });
    console.log(error);
  }
}

onUpload(){
  console.log('upload clicked');
  if (this.bulkNotes == undefined) {
      this.errMessage = 'invalid file uploaded';
       this._snackBar.open(this.errMessage, 'Thanks!!', {
                  duration: this.snackDuration,
                });
    } else {
      let userId = this.authService.getUserId();
      let totalData = this.bulkNotes.length;
      let processedData = 0;
      while (processedData <totalData){
        let i=0;
        this.batch=[];
          while (i <=this.batchCount && totalData>processedData){
            this.bulkNotes[processedData].userId = userId;
            this.batch.push(this.bulkNotes[processedData]);
            processedData++;
            i++;
          }
        this.noteService.uploadBulkNotes(this.batch).subscribe(
        data => {this.noteService.fetchNotesFromServer(),this.errMessage = (processedData) + " Notes posted successfully, server message :"+ data['message'],
       this._snackBar.open(this.errMessage, 'Thanks!!', {
                  duration: this.snackDuration,
                });},
        err => this.errMessage = err.message
        );
        //processedData = processedData + this.batchCount;
      }      
    }
  }
}


