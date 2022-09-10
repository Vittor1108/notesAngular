import { TestBed } from '@angular/core/testing';

import { CreateNewTaskService } from './create-new-task.service';

describe('CreateNewTaskService', () => {
  let service: CreateNewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
