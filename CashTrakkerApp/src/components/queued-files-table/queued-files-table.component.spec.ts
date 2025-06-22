import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedFilesTableComponent } from './queued-files-table.component';

describe('AttachedFilesTableComponent', () => {
  let component: QueuedFilesTableComponent;
  let fixture: ComponentFixture<QueuedFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueuedFilesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueuedFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
