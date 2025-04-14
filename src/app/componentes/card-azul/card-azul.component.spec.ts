import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAzulComponent } from './card-azul.component';

describe('CardAzulComponent', () => {
  let component: CardAzulComponent;
  let fixture: ComponentFixture<CardAzulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAzulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAzulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
