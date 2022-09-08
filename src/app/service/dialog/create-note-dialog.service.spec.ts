import { TestBed } from '@angular/core/testing';

import { CreateNoteDialogService } from './create-note-dialog.service';

describe('CreateNoteDialogService', () => {
  let service: CreateNoteDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNoteDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
