import { Component } from '@angular/core';
import { Flashcard, FlashcardDTO } from './models/flashcard/flashcard';
import { FlashcardService } from './services/flashcard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Flash Cards';
  tableView = false;
  flashcards: Flashcard[] = [];
  flashcardAnswer: boolean[] = [];
  displayedColumns: string[] = ['Question', 'Answer', 'Options'];

  constructor(
    private flashcardService: FlashcardService
  ) {}

  ngOnInit(): void {
    this.flashcardService.getFlashcards().subscribe(
      (data) => {
        console.log(data);
        this.flashcards = data;
        this.flashcardAnswer = new Array(this.flashcards.length);
        for (let i = 0; i < this.flashcardAnswer.length; i++) {
          this.flashcardAnswer[i] = false;
        }
      }
    )
  }

  ShowAnswer(card: Flashcard): void {
    for (let i = 0; i < this.flashcards.length; i++) {
      if (card.id == this.flashcards[i].id) {
        this.flashcardAnswer[i] = !this.flashcardAnswer[i];
      }
    }
  }

  RevealedAnswer(card: Flashcard): boolean {
    for (let i = 0; i < this.flashcards.length; i++) {
      if (card.id == this.flashcards[i].id) {
        return this.flashcardAnswer[i];
      }
    }
    return false;
  }

  Toggle(): void {
    this.tableView = !this.tableView;
  }

  CreateFlashcard() {
    let question = prompt('Please enter the question for the flashcard.');
    let answer = prompt(`The question was: ${question}. Please enter the answer for the flashcard.`);
    let card: FlashcardDTO;
    if (question != null && answer != null) {
      card = new FlashcardDTO('3fa85f64-5717-4562-b3fc-2c963f66afa6', question, answer);
      this.flashcardService.createFlashcard(card).subscribe(
        (data) => {
          console.log(data);
          this.ngOnInit();
        }
      )
    }
  }

  DeleteFlashcard(card: Flashcard) {
    this.flashcardService.deleteFlashcard(card).subscribe (
      (data) => {
        this.ngOnInit();
      }
    );
  }

  EditFlashcard(card: Flashcard) {
    let question = prompt(`The previous question was: "${card.question}" What is the new question?`);
    if (question != null) {
      card.question = question;
    }
    let answer = prompt(`The previous answer was: ${card.answer}. What is the new answer?`);
    if (answer != null) {
      card.answer = answer;
    }
    this.flashcardService.editFlashcard(card).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      }
    )
  }
}
