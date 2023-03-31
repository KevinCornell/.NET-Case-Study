import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flashcard } from '../models/flashcard/flashcard';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  url: string = 'https://localhost:7257/';

  constructor(private http: HttpClient) { }

  public getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.url + 'api/Flashcards')
    .pipe(map((flashcards: Flashcard[]) => flashcards.map(flashcard => new Flashcard(flashcard))));
  }
}
