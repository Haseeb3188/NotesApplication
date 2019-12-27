export class Note {
  noteId: string;
  title: string;
  text: string;
  state: string;
  userId: string;
  group:string;
  favourite: boolean;
  selected: boolean;
  mark: boolean;

  constructor() {
    this.title = '';
    this.text = '';
    this.state = 'not-started';
  }
}
