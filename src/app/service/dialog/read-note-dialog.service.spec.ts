import { TestBed } from '@angular/core/testing';

import { ReadNoteDialogService } from './read-note-dialog.service';

describe('ReadNoteDialogService', () => {
  let service: ReadNoteDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadNoteDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
