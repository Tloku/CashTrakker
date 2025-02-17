import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTableContainerComponent } from './expenses-table-container.component';

describe('ExpensesTableContainerComponent', () => {
  let component: ExpensesTableContainerComponent;
  let fixture: ComponentFixture<ExpensesTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesTableContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
