import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoEmpilhadoComponent } from './grafico-empilhado.component';

describe('GraficoEmpilhadoComponent', () => {
  let component: GraficoEmpilhadoComponent;
  let fixture: ComponentFixture<GraficoEmpilhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoEmpilhadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoEmpilhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
