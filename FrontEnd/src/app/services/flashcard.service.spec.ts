import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashcardService } from './flashcard.service';

describe('FlashcardService', () => {
  let service: FlashcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlashcardService]
    });
    service = TestBed.inject(FlashcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
