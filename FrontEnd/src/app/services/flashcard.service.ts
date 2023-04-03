import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flashcard, FlashcardDTO } from '../models/flashcard/flashcard';
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

  public createFlashcard(card: FlashcardDTO):Observable<Flashcard> {
    return this.http.post<Flashcard>(this.url + 'api/Flashcards', card)
    .pipe(map(flashcard => new Flashcard(flashcard)));
  }

  public deleteFlashcard(card: Flashcard) {
    return this.http.delete(this.url + 'api/Flashcards/' + card.id);
  }

  public editFlashcard(card: Flashcard) {
    return this.http.put(this.url + 'api/Flashcards/' + card.id, card)
    .pipe(map(flashcard => new Flashcard(flashcard)));
  }
}
