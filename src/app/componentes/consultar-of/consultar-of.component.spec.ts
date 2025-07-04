import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarOFComponent } from './consultar-of.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { OrdemFornecimento } from '../../model/ordemFornecimento';

describe('ConsultarOFComponent', () => {
  let component: ConsultarOFComponent;
  let fixture: ComponentFixture<ConsultarOFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarOFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar filtro', () => {
    var listaOrdemFornecimento: OrdemFornecimento[] = []
    const event = {
      target: {
        value: 'texto de filtro'
      }
    } as unknown as Event;
    spyOn(component.ofService, 'vericarLista').and.returnValue(of(listaOrdemFornecimento))

    component.listar()
    component.applyFilter(event)

    expect(component.dataSource.filter).toBe('texto de filtro')
  })

  it('Deve listar', () => {
    var listaOrdemFornecimento: OrdemFornecimento[] = []
    spyOn(component.ofService, 'vericarLista').and.returnValue(of(listaOrdemFornecimento))

    component.listar()

    expect(component.ofService.ordemFornecimentos).toBe(listaOrdemFornecimento)
  })

  it('Deve listar por id', () => {
    var ordemFornecimento: OrdemFornecimento = new OrdemFornecimento()
    spyOn(component.ofService, 'verificarListaId').and.returnValue(of(ordemFornecimento))

    component.listarPorId(1)

    expect(component.ofService.ordemFornecimento).toBe(ordemFornecimento)
  })

  it('Deve listar após excluir', () => {
    spyOn(component, 'listar')
    spyOn(component.ofService, 'verificarExclusao').and.returnValue(of(undefined))

    component.excluir(1)

    expect(component.listar).toHaveBeenCalled();
  })

  it('Deve abrir o modal', () => {
    spyOn(component.dialog, 'open')

    // component.openDialog()

    expect(component.dialog.open).toHaveBeenCalled();
  })
});
