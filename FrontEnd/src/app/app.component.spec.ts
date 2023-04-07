import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashcardService } from './services/flashcard.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Flashcard, FlashcardDTO } from './models/flashcard/flashcard';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({id: '0', qustion: 'q0', answer: 'a0'})
    };
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        FlashcardService,
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Flash Cards'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Flash Cards');
  });

  it(`should have tableView initialized to false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.tableView).toEqual(false);
  });

  it(`should toggle tableView when Toggle() is called`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.Toggle();
    expect(app.tableView).toEqual(true);
  });

  it(`should get all flashcards on ngOnInit()`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    //I don't think I have a way of testing/mocking if a
    //Component gets infromation from a service. So
    //calling ngOnInit() gets an empty array.
    const expected: Flashcard[] = [];

    expect(app.flashcards).toEqual(expected);
  });

  it('should set flashcardAnswer with id: 1 to be true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    let flashcards: Flashcard[] = [
      new Flashcard(new FlashcardDTO('0', 'q0', 'a0')),
      new Flashcard(new FlashcardDTO('1', 'q1', 'a1')),
      new Flashcard(new FlashcardDTO('2', 'q2', 'a2'))
    ];
    let flashcardAnswer: boolean[] = [
      false,
      false,
      false
    ];

    app.flashcards = flashcards;
    app.flashcardAnswer = flashcardAnswer;

    app.ShowAnswer(flashcards[1]);

    expect(app.flashcardAnswer[1]).toEqual(true);
  });

  it('should see that flashcardAnswer with id:2 is true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    let flashcards: Flashcard[] = [
      new Flashcard(new FlashcardDTO('0', 'q0', 'a0')),
      new Flashcard(new FlashcardDTO('1', 'q1', 'a1')),
      new Flashcard(new FlashcardDTO('2', 'q2', 'a2'))
    ];
    let flashcardAnswer: boolean[] = [
      false,
      false,
      false
    ];

    app.flashcards = flashcards;
    app.flashcardAnswer = flashcardAnswer;

    app.ShowAnswer(flashcards[2]);

    expect(app.RevealedAnswer(flashcards[2])).toEqual(true);
  });

  it('should create a flashcard', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.CreateFlashcard('q0', 'a0');

    const expected: Flashcard[] = [];

    expect(app.flashcards).toEqual(expected);
  });

  it('should edit a flashcard', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    let f0: Flashcard = new Flashcard(new FlashcardDTO('0', 'q0', 'a0'));
    app.EditFlashcard(f0);

    const expected: Flashcard[] = [];

    expect(app.flashcards).toEqual(expected);
  });

  it('should open OpenCardCreator', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.OpenCardCreator();

    expect(app).toBeTruthy();
  });

  it('should open OpenCardEditor', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    let f0: Flashcard = new Flashcard(new FlashcardDTO('0', 'q0', 'a0'));
    app.OpenCardEditor(f0);

    expect(app).toBeTruthy();
  });

});
