import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInfoCardComponent } from './header-info-card.component';

describe('HeaderInfoCardComponent', () => {
  let component: HeaderInfoCardComponent;
  let fixture: ComponentFixture<HeaderInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
