import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CreateNoteDialogComponent } from 'src/app/components/create-note-dialog/create-note-dialog.component';
import { CreateNoteDialogService } from 'src/app/service/dialog/create-note-dialog.service';
import InterfaceNotes from 'src/app/interface/Notes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss'],
})
export class HomeCardsComponent implements OnInit {
  allNotes: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    private createNote: CreateNoteDialogService
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  createNewNotes(): void {
    const dialogRef = this.dialog.open(CreateNoteDialogComponent, {
      width: '30%',
    });
  }

  getNotes(): void {
    this.createNote.addLastNote().then(element => {
      const teste = element.subscribe((teste: any) => this.allNotes = teste);
    });
  }
}
