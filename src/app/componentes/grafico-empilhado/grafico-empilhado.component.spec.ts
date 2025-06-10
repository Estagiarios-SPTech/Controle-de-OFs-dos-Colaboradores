import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoEmpilhadoComponent } from './grafico-empilhado.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../../model/User';
import { of, throwError } from 'rxjs';
import { OrdemFornecimento } from '../../model/ordemFornecimento';

describe('GraficoEmpilhadoComponent', () => {
  let component: GraficoEmpilhadoComponent;
  let fixture: ComponentFixture<GraficoEmpilhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoEmpilhadoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar os usuários', () => {
    var users: User[] = []
    spyOn(component.usuarioService, "select").and.returnValue(of(users))

    component.carregarUsuarios()

    expect(component.usuarios).toEqual(users)
  })

  it('Deve resultar em erro ao carregar os usuários', () => {
    var erro = new Error()
    spyOn(component.usuarioService, "select").and.returnValue(throwError(() => erro))
    spyOn(console, 'error')

    component.carregarUsuarios()

    expect(console.error).toHaveBeenCalledWith('Erro ao carregar usuários:', erro)
  })

  it('Deve carregar as ordens de fornecimento', () => {
    var ordemFornecimentos: OrdemFornecimento[] = []
    spyOn(component.ofService, 'vericarLista').and.returnValue(of(ordemFornecimentos))

    component.carregarOrdemFornecimento()

    expect(component.ofService.ordemFornecimentos).toEqual(ordemFornecimentos)
  })

  // it('Deve destruir o chart existente para gerar um novo', () => {  

  //   component.criarGrafico()
  // })

  it('Deve carregar o ngOnInit', () => {
    spyOn(component, 'carregarUsuarios');
    spyOn(component, 'carregarOrdemFornecimento');

    component.ngOnInit()

    expect(component.carregarUsuarios).toHaveBeenCalled();
    expect(component.carregarOrdemFornecimento).toHaveBeenCalled();
  })
});
