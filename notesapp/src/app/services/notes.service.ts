import { Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService implements OnInit {

  notes: Array<Note>;
  note: Note;
  notesSubject: BehaviorSubject<Array<Note>>;
  token: any;
  userId: any;
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
  }
  ngOnInit() {
    this.fetchNotesFromServer();
  } 

  fetchNotesFromServer() {
   this.token = this.authService.getBearerToken();
   this.userId = this.authService.getUserId();
   return this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes?userId='+this.userId, {
     'headers': new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
   }).subscribe(notes => {
   this.notes = notes;
   this.notesSubject.next(this.notes);
  },
  err => this.notesSubject.error(err)
  ); }
  getNotes(): Observable<Array<Note>> {
   return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    this.token = this.authService.getBearerToken();
    console.log(this.authService.getUserId());
   return this.http.post<Note>('http://localhost:3000/api/v1/notes?userId='+this.authService.getUserId(), note, {
     'headers': new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
   }).do(addNote => {
     this.notes.push(addNote);
     this.notesSubject.next(this.notes);
   },
   err => this.notesSubject.error(err));
  }
  editNote(note: Note): Observable<Note>  {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.noteId}`, note, {
    'headers': new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).do(editNote => {
    
    const noteObj = this.notes.find(n => n.noteId == editNote.noteId);
     Object.assign(noteObj, editNote.noteId=editNote.noteId+1);
     this.notesSubject.next(this.notes);
   },
   err => this.notesSubject.error(err)
   ); }

   deleteNote(note: Note): Observable<Object>  {
    return this.http.delete(`http://localhost:3000/api/v1/notes/${note.noteId}`,{
    'headers': new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).do(res => {
    
    const noteObj = this.notes.filter(n => n.noteId != res['noteId']);     
     this.notesSubject.next(this.notes);
   },
   err => this.notesSubject.error(err)
   ); }

  shareNote(notes: Array<Note>, email:string): Observable<Object>  {
    return this.http.post(`http://localhost:3000/api/v1/notes/share?email=${email}`,notes,{
    'headers': new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).do(res => {
    
    console.log(res);    
     this.notesSubject.next(this.notes);
   },
   err => this.notesSubject.error(err)
   ); }
  uploadBulkNotes(notes: Array<Note>): Observable<Object>  {
    return this.http.post('http://localhost:3000/api/v1/notes/stream?userId='+this.authService.getUserId(),notes,{
    'headers': new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  }).do(res => {    
    console.log(res);    
     this.notesSubject.next(this.notes);
   },
   err =>{ console.log(err);  this.notesSubject.error(err)}
   ); }
  getNoteById(noteId): Note {    
   const noteObj = this.notes.find(note => note.noteId == noteId);
   return Object.assign({}, noteObj);
  }
}
