import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPieOfComponent } from './grafico-pie-of.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';

describe('GraficoPieOfComponent', () => {
  let component: GraficoPieOfComponent;
  let fixture: ComponentFixture<GraficoPieOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPieOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar as ordens de fornecimento por status', () => {
    var status = "Pendente de cadastramento"
    spyOn(component.ofService, 'verificarQuantidadePorStatus').and.returnValue(of(1))

    component.carregarPorStatus(status, status, status)

    expect(component.ofPendente).toEqual(1)
    expect(component.ofIniciada).toEqual(1)
    expect(component.ofValidada).toEqual(1)
  })
});
