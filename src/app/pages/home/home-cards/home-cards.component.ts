import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CreateNoteDialogComponent } from 'src/app/components/create-note-dialog/create-note-dialog.component';
import { CreateNoteDialogService } from 'src/app/service/dialog/create-note-dialog.service';
import { ReadNoteDialogComponent } from 'src/app/components/read-note-dialog/read-note-dialog.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss'],
})
export class HomeCardsComponent implements OnInit {
  allNotes: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    private createNote: CreateNoteDialogService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  public createNewNotes(): void {
    const dialogRef = this.dialog.open(CreateNoteDialogComponent, {
      width: '30%',
      data: { getNotes: this.getNotes },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getNotes();
    });
  }

  public async getNotes() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user): any => {
      if (user) {
        const userEmail = user.email!;
        this.createNote.addLastNote(userEmail).then((element) => {
          element.subscribe((allNotes: any) => (this.allNotes = allNotes));
        });
      }
    });
  }

  public readNotes(nameTask: string, userEmail: string, id:number, descriptionTask: string, date: string): void {
    const dialogRef = this.dialog.open(ReadNoteDialogComponent, {
      width: '40%',
      data: {nameTask, userEmail, id, descriptionTask, date}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.configSnackBar(result);
      this.getNotes();
    })
  }

  private configSnackBar(text: string): void{
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
    if(text === 'edit'){
      this.snackBar.open("Nota Editada!!", "", {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: ['notes-add'],
        duration: 1.5 * 1000
      });
    }else if (text === 'exclude'){
      this.snackBar.open("Nota excluida com sucesso!", "", {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: ['notes-add'],
        duration: 1.5 * 1000
      });
    }
  }
}
