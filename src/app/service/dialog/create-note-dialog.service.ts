import { Injectable } from '@angular/core';
import { Firebase } from '../firebase/firebase-config.service';
import { getFirestore, collection, addDoc, getDocs, query, where, limitToLast, doc, getDocFromCache, getDoc, orderBy, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Observable, of } from 'rxjs';

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
    try {
      const docRef = await addDoc(collection(this.db, "notes"), {
        nameTask: infoNotes.nameTask,
        descriptionNote: infoNotes.descriptionNote,
        date: `${day}/${month}/${year}`,
        email: userEmail,

      });
      this.addNotes = true;
    } catch (e) {
      this.addNotes = false;
    }
  }

  async addLastNote(): Promise<any>{
    const q = query(collection(this.db, "notes"));
    const querySnapShot = await getDocs(q);
    let allTasks:any = [];
    querySnapShot.forEach((element => {
      allTasks.push(element.data());
    }));
    const allTasksOk = of(allTasks);
    return allTasksOk;
  }
}
