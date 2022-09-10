import { Injectable } from '@angular/core';
import {doc, updateDoc, getFirestore, deleteDoc} from 'firebase/firestore';
import { Firebase } from '../firebase/firebase-config.service';
@Injectable({
  providedIn: 'root'
})
export class ReadNoteDialogService {
  db = getFirestore(Firebase);
  constructor() { }



  async editNote(id:string, infoNotes: {nameNote: string, descriptionNote: string}): Promise<any> {
    const notesRef = doc(this.db, "notes", id);
    await updateDoc(notesRef, {
      nameTask: infoNotes.nameNote,
      descriptionNote: infoNotes.descriptionNote,
    });
  }

  async excludeNote(id: string): Promise<any>{
    await deleteDoc(doc(this.db, "notes", id));
  }
}
