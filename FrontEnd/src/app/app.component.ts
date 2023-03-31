import { Component } from '@angular/core';
import { Flashcard } from './models/flashcard/flashcard';
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
  displayedColumns: string[] = ['Question', 'Answer', 'Options'];

  constructor(
    private flashcardService: FlashcardService
  ) {}

  ngOnInit(): void {
    this.flashcardService.getFlashcards().subscribe(
      (data) => {
        console.log(data);
        this.flashcards = data;
      }
    )
  }

  ShowAnswer(flashcard: Flashcard): void {
    alert(flashcard.answer);
  }

  Toggle(): void {
    this.tableView = !this.tableView;
  }
}
