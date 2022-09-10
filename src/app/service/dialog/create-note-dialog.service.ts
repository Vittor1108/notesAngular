import { Injectable } from '@angular/core';
import { Firebase } from '../firebase/firebase-config.service';
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc} from 'firebase/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateNoteDialogService {
  db = getFirestore(Firebase);
  addNotes: any =  null;

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
    const id = Math.floor(Math.random() * 99999);
    try {
      const docRef = await setDoc(doc(this.db, "notes", `${id}`), {
        nameTask: infoNotes.nameTask,
        descriptionNote: infoNotes.descriptionNote,
        date: `${day}/${month}/${year}`,
        email: userEmail,
        id
      });
      this.addNotes = true;
    } catch (e) {
      this.addNotes = false;
    }
  }

  async addLastNote(userEmail: string): Promise<any>{
    const q = query(collection(this.db, "notes"), where('email', '==', userEmail));
    const querySnapShot = await getDocs(q);
    let allTasks:any = [];
    querySnapShot.forEach((element => {
      allTasks.push(element.data());
    }));
    const allTasksOk = of(allTasks);
    return allTasksOk;
  }
}
