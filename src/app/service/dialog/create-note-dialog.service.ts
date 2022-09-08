import { Injectable } from '@angular/core';
import { Firebase } from '../firebase/firebase-config.service';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class CreateNoteDialogService {
  db = getFirestore(Firebase);

  constructor() {}

  async saveInfoNotes(
    infoNotes: {
      nameTask: string;
      descriptionNote: string;
    },
    userEmail: string
  ) {
    const date = new Date();
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    try {
      const docRef = await addDoc(collection(this.db, "notes"), {
        nameTask: infoNotes.nameTask,
        descriptionNote: infoNotes.descriptionNote,
        date: `${day}/${month}/${year}`
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



}
