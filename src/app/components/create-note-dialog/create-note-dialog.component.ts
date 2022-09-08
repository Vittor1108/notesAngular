import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

// SERVICE
import { CreateNoteDialogService } from 'src/app/service/dialog/create-note-dialog.service';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.scss'],
})
export class CreateNoteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateNoteDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private serviceNote: CreateNoteDialogService,
  ) {}


  form!: FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameTask: ['', [Validators.required, Validators.minLength(3)]],
      descriptionNote: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  closeModal(): void {
    this.dialogRef.close();
  }



  handleSubmit():void{
    this.configSnackbar();
    this.createNewNote(this.form.value);

    this.dialogRef.close();
  }

  createNewNote(valueForm: {nameTask:string, descriptionNote: string}){
    this.serviceNote.saveInfoNotes(valueForm);
  }

  configSnackbar(){
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
    this.snackBar.open("Nota Adiconada!!", "", {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: ['notes-add'],
      duration: 1.5 * 1000
    });

  }

}
