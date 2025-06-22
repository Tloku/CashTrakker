import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtCommonTableComponent } from './ct-common-table.component';

describe('CtTableComponent', () => {
  let component: CtCommonTableComponent;
  let fixture: ComponentFixture<CtCommonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtCommonTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtCommonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
