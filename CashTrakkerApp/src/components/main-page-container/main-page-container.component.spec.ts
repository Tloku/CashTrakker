import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageContainerComponent } from './main-page-container.component';

describe('MainPageContainerComponent', () => {
  let component: MainPageContainerComponent;
  let fixture: ComponentFixture<MainPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
