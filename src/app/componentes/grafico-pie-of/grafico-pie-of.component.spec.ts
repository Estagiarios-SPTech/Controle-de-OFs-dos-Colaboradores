import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPieOfComponent } from './grafico-pie-of.component';

describe('GraficoPieOfComponent', () => {
  let component: GraficoPieOfComponent;
  let fixture: ComponentFixture<GraficoPieOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPieOfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPieOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
