import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStructureComponent } from './quiz-structure.component';

describe('QuizStructureComponent', () => {
  let component: QuizStructureComponent;
  let fixture: ComponentFixture<QuizStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
