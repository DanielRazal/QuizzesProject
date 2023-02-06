import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByQuizComponent } from './report-by-quiz.component';

describe('ReportByQuizComponent', () => {
  let component: ReportByQuizComponent;
  let fixture: ComponentFixture<ReportByQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
