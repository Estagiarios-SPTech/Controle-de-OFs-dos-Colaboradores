import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOfComponent } from './modal-of.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { OrdemFornecimento } from '../../model/ordemFornecimento';

describe('ModalOfComponent', () => {
  let component: ModalOfComponent;
  let fixture: ComponentFixture<ModalOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve alterar com sucesso', () => {
    var ordemFornecimento: OrdemFornecimento = new OrdemFornecimento()
    spyOn(component.ofService, 'verificarAlteracao').and.returnValue(of(ordemFornecimento))

    component.alterarOf(ordemFornecimento)

    expect(component.ofService.verificarAlteracao).toHaveBeenCalledWith(ordemFornecimento)
  })
});
