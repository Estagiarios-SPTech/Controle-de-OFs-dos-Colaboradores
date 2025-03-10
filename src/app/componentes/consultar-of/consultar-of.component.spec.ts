import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarOFComponent } from './consultar-of.component';

describe('ConsultarOFComponent', () => {
  let component: ConsultarOFComponent;
  let fixture: ComponentFixture<ConsultarOFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarOFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarOFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
