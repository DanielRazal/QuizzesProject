import { TestBed } from '@angular/core/testing';

import { QuizTypeService } from './quiz-type.service';

describe('QuizTypeService', () => {
  let service: QuizTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
