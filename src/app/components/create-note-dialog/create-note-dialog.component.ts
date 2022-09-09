import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { getAuth } from 'firebase/auth';

// INTERFACE
import InterfaceNotes from 'src/app/interface/Notes';


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
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  handleSubmit():void{
    this.createNewNote(this.form.value);

    this.dialogRef.close();
  }

  async createNewNote(valueForm: {nameTask:string, descriptionNote: string}){
    const userEmail = getAuth().currentUser?.email;
    const saveInfoNotes =  await this.serviceNote.saveInfoNotes(valueForm, userEmail!);
    const snackBar = await this.configSnackbar(await this.serviceNote.addNotes);
  }

  async configSnackbar(noteCreate: boolean){
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    if(noteCreate){
      this.snackBar.open("Nota Adiconada!!", "", {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: ['notes-add'],
        duration: 1.5 * 1000
      });
    }else{
      this.snackBar.open("Não foi possível adiconar sua note, tente novamente", "", {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: ['notes-notAdd'],
        duration: 1.5 * 1000
      });
    }
  }

}
