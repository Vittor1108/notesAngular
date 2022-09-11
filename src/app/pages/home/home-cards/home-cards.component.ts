import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CreateNoteDialogComponent } from 'src/app/components/create-note-dialog/create-note-dialog.component';
import { CreateNoteDialogService } from 'src/app/service/dialog/create-note-dialog.service';
import { ReadNoteDialogComponent } from 'src/app/components/read-note-dialog/read-note-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EmotionalPhraseService } from 'src/app/service/emotionalPharse/emotional-phrase.service';
import { CreateNewTaskService } from 'src/app/service/createNewTask/create-new-task.service';
import { WheaterCardService } from 'src/app/service/wheaterCard/wheater-card.service';
@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss'],
})
export class HomeCardsComponent implements OnInit {
  allNotes: Array<any> = [];
  allTasks: Array<any>  = [];
  phraseEmotional!: string;
  locationUser!: string;
  date!:string;
  day!:string;
  form!: FormGroup;
  email!:string;
  hours!: string;
  actualTemp!: number;
  @ViewChild('taskValue') input: any;

  constructor(
    public dialog: MatDialog,
    private createNote: CreateNoteDialogService,
    private snackBar: MatSnackBar,
    private pharseService: EmotionalPhraseService,
    public formBuilder: FormBuilder,
    private taskService: CreateNewTaskService,
    private weatherService: WheaterCardService
  ) {}

  ngOnInit(): void {
    this.getNotes();
    this.getTasks()
    this.getDateAndDay();
    setInterval(() => {
      this.getPharse();
      this.getDateAndDay();
    }, 60000);

    this.getPharse();

    this.form = this.formBuilder.group({
      addTask: ['', [Validators.required]],
    });

    this.getLocationUser();
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
        this.email = userEmail;
        this.createNote.addLastNote(userEmail).then((element) => {
          element.subscribe((allNotes: any) => (this.allNotes = allNotes));
        });
      }
    });
  }

  public readNotes(
    nameTask: string,
    userEmail: string,
    id: number,
    descriptionTask: string,
    date: string
  ): void {
    const dialogRef = this.dialog.open(ReadNoteDialogComponent, {
      width: '40%',
      data: { nameTask, userEmail, id, descriptionTask, date },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.configSnackBar(result);
      this.getNotes();
    });
  }

  private configSnackBar(text: string): void {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
    if (text === 'edit') {
      this.snackBar.open('Nota Editada!!', '', {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: ['notes-add'],
        duration: 1.5 * 1000,
      });
    } else if (text === 'exclude') {
      this.snackBar.open('Nota excluida com sucesso!', '', {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: ['notes-add'],
        duration: 1.5 * 1000,
      });
    }
  }

  public getPharse(): void {
    this.pharseService.getPharse().subscribe((pharse) => {
      this.phraseEmotional = pharse.slip.advice;
    });
  }

  public handleSubmitTask():void{
    this.taskService.createTask(this.form.value.addTask, this.email);
    this.taskService.addLastTask(this.email).then((element) => {
      element.subscribe((allTasks: any) => (this.allTasks = allTasks));
    });
  }

  private getTasks():void{
    const auth = getAuth();
    onAuthStateChanged(auth, (user): any => {
      if (user) {
        const userEmail = user.email!;
        this.taskService.addLastTask(userEmail).then((element) => {
          element.subscribe((allTasks: any) => (this.allTasks = allTasks));
        });
      }
    });
  }

  public deleteTask(id:number):void {
    const idToString = `${id}`;
    this.taskService.deleteTask(idToString);
    this.getTasks();
  }

  private getLocationUser():void {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((infoLocation)=> {
        const userInfo = {lat: infoLocation.coords.latitude, lng: infoLocation.coords.longitude};
        this.weatherService.userLocation(userInfo).then((element) => {
          element.subscribe((location: any) => {
            this.locationUser =  location.results[0].formatted_address.split(",")[2];
            this.getWheater(userInfo);
          });

        });
      });
    }
  }

  public getDateAndDay():void {
    const date = new Date();
    const day = date.getDay();
    const dayDate = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    this.date = `${dayDate}/${month}/${year}`;

    const hour = date.getHours() > 0 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    this.hours = `${hour}:${minutes}`
    switch(day){
      case 0:
        this.day = 'DOM';
        break;
      case 1:
        this.day = 'SEG';
        break;
      case 2:
        this.day = 'TER';
        break;
      case 3:
        this.day = 'QUA';
        break;
      case 4:
        this.day = 'QUI';
        break;
      case 5:
        this.day = 'SEX';
        break;
      case 6:
        this.day = 'SAB';
        break;
      default:
    }
  }

  private getWheater(latLng: {lat: number, lng: number}): void{
    this.weatherService.getWheater(latLng).then((element => {
      element.subscribe((element:any)=> {
        this.actualTemp = Math.floor(element.main.temp);
      });
    }));

    
  }
}
