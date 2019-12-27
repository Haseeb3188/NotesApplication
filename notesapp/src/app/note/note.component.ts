import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { EditNoteOpenerComponent } from '../edit-note-opener/edit-note-opener.component';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note: Note;
  errorMsg:string;
  groups: Array<string> = ['group1', 'group2', 'group3', 'group4'];
  constructor(private routerService: RouterService, private noteService: NotesService) {}

  openEditView() {
    this.routerService.routeToEditNoteView(this.note.noteId);
  }
  markChanges(){
    this.note.selected = true;
  }

  deleteNote()
  {
    if(confirm("This will delete the note '"+ this.note.title+"' permanently ")) {
    this.noteService.deleteNote(this.note).subscribe(
      data =>[],
      err => this.errorMsg = err.message
      );
    this.noteService.fetchNotesFromServer();
  }
    
  }

}
