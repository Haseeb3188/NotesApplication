import { Component, OnInit } from '@angular/core';
import { NotesService} from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  errMessage: string;
  note: Note= new Note();
  notes: Array<Note>= [];
  check: string;
  constructor(private noteService: NotesService) { }
  takeNote() {
    if (this.note.title === '' && this.note.text === '' ) {
      this.errMessage = 'Title and Text both are required fields';
    } else {      
      this.noteService.addNote(this.note).subscribe(
        data => [],
        error => { const indx: number = this.notes.findIndex(note => note.title === this.note.title);
                this.notes.splice(indx, 1) ;
                this.errMessage = error.message;
        }
        );
      this.notes.push(this.note);
      this.noteService.fetchNotesFromServer();  
      this.note = new Note();
    }
  }
}
