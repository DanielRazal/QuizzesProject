import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByStudentComponent } from './report-by-student.component';

describe('ReportByStudentComponent', () => {
  let component: ReportByStudentComponent;
  let fixture: ComponentFixture<ReportByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
