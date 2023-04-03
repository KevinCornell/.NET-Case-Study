import { IFlashcard } from './flashcardinterface';

export class FlashcardDTO implements IFlashcard {
  id: string;
  question: string;
  answer: string;

  constructor(id: string, question:string, answer: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }
}

export class Flashcard implements IFlashcard {
  id?: string | undefined;
  question?: string | undefined;
  answer?: string | undefined;

  constructor(flashcard: IFlashcard) {
    this.id = flashcard.id;
    this.question = flashcard.question;
    this.answer = flashcard.answer;
  }
}
