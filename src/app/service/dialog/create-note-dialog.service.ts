import { Injectable } from '@angular/core';
import { Firebase } from '../firebase/firebase-config.service';
import { getFirestore, collection, addDoc} from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class CreateNoteDialogService {
  db  = getFirestore(Firebase);

  constructor() {
    
  }

  async saveInfoNotes(infoNotes: {
    nameTask: string;
    descriptionNote: string;
  }) {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



}
