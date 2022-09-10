import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmotionalPhraseService {
  private apiUrl = 'https://api.adviceslip.com/advice';


  constructor(private http: HttpClient) { }

  getPharse():Observable<{slip: {id: number, advice: string}}>{
    return this.http.get<{slip: {id: number, advice: string}}>(this.apiUrl);
  }
}
