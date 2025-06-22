import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlyAddedFilesTableComponent } from './newly-added-files-table.component';

describe('NewlyAddedFilesComponent', () => {
  let component: NewlyAddedFilesTableComponent;
  let fixture: ComponentFixture<NewlyAddedFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewlyAddedFilesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewlyAddedFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
