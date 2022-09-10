import { TestBed } from '@angular/core/testing';

import { EmotionalPhraseService } from './emotional-phrase.service';

describe('EmotionalPhraseService', () => {
  let service: EmotionalPhraseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmotionalPhraseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
