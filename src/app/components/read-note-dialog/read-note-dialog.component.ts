import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// SERVICE
import { ReadNoteDialogService } from 'src/app/service/dialog/read-note-dialog.service';
@Component({
  selector: 'app-read-note-dialog',
  templateUrl: './read-note-dialog.component.html',
  styleUrls: ['./read-note-dialog.component.scss'],
})
export class ReadNoteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public infoNotes: {
      nameTask: string;
      userEmail: string;
      id: number;
      descriptionTask: string;
      date: string;
    },
    public dialogRef: MatDialogRef<ReadNoteDialogComponent>,
    private formBuilder: FormBuilder,
    private readNote: ReadNoteDialogService,
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameNote: [this.infoNotes.nameTask, [Validators.required, Validators.minLength(3)]],
      descriptionNote: [this.infoNotes.descriptionTask, [Validators.required, Validators.minLength(5)]],
    })
  }

  closeModal():void{
    this.dialogRef.close();
  }

  handleSubmit(id:number):void{
    const idToString = `${id}`
    this.readNote.editNote(idToString, this.form.value);
    this.dialogRef.close('edit');
  }

  excludeNote(id: number){
    const idToString = `${id}`;
    this.readNote.excludeNote(idToString);
    this.dialogRef.close('exclude');
  }

}
