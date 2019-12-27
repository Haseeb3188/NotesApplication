import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  groups: Array<string> = ['group1', 'group2', 'group3', 'group4'];
  errMessage: string;
  constructor(private refMatDialogue: MatDialogRef<EditNoteViewComponent>,
              private noteService: NotesService,
              @Inject(MAT_DIALOG_DATA) private data: any) {}
  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);    
  }
  onSave() {
    this.noteService.editNote(this.note).subscribe(editNote => {
      this.noteService.fetchNotesFromServer();
      this.refMatDialogue.close();
    },
    err => this.errMessage = err.message);
  }
}
