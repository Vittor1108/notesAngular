import { Injectable } from '@angular/core';
import { doc, getFirestore, setDoc, where, query, collection, getDocs, deleteDoc} from 'firebase/firestore';
import { Firebase } from '../firebase/firebase-config.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateNewTaskService {
  db = getFirestore(Firebase);
  constructor() { }

  async createTask(valueTask: string, email: string): Promise<any>{
    const id = Math.floor(Math.random() * 99999);
    try{
      const docRef = await setDoc(doc(this.db, "tasks", `${id}`), {
        nameTask: valueTask,
        idTask: id,
        email
      });
    }catch(error){
      console.log("Deu erro");
    }
  }

  async addLastTask(userEmail: string): Promise<any> {
    const q = query(collection(this.db, "tasks"), where('email', '==', userEmail));
    const querySnapShot = await getDocs(q);
    let todasTarefas:any = [];
    querySnapShot.forEach((element => {
      todasTarefas.push(element.data());
    }));
    const todasTarefasOk = of (todasTarefas);
    return todasTarefasOk;
  }

  async deleteTask(id: string): Promise<any>{
    await deleteDoc(doc(this.db, "tasks", id));
  }

}
