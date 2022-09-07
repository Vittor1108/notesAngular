import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.scss'],
})
export class CreateNoteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateNoteDialogComponent>,
  ) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
