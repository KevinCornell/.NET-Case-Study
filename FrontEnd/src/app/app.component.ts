import { Component } from '@angular/core';
import { Flashcard, FlashcardDTO } from './models/flashcard/flashcard';
import { FlashcardService } from './services/flashcard.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardCreatorComponent } from './components/card-creator/card-creator.component';
import { CardEditorComponent } from './components/card-editor/card-editor.component';

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
    private flashcardService: FlashcardService,
    private dialog: MatDialog
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

  CreateFlashcard(question: string | undefined, answer: string | undefined) {
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
    this.flashcardService.editFlashcard(card).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      }
    )
  }

  OpenCardCreator() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = new Flashcard(new FlashcardDTO('3fa85f64-5717-4562-b3fc-2c963f66afa6', '', ''));

    const dialogRef = this.dialog.open(CardCreatorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: Flashcard) => {
        this.CreateFlashcard(data.question, data.answer);
      }
    );
  }

  OpenCardEditor(card: Flashcard) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = card;

    const dialogRef = this.dialog.open(CardEditorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: Flashcard) => {
        card.question = data.question;
        card.answer = data.answer;
        this.EditFlashcard(card);
      }
    )
  }
}
