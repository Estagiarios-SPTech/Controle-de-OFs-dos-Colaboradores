import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarraOfComponent } from './grafico-barra-of.component';

describe('GraficoBarraOfComponent', () => {
  let component: GraficoBarraOfComponent;
  let fixture: ComponentFixture<GraficoBarraOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoBarraOfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoBarraOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
