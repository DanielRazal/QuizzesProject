import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateQuizComponent } from './duplicate-quiz.component';

describe('DuplicateQuizComponent', () => {
  let component: DuplicateQuizComponent;
  let fixture: ComponentFixture<DuplicateQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
