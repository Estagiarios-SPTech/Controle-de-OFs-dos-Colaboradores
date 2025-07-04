import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarOFComponent } from './cadastrar-of.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OrdemFornecimento } from '../../model/ordemFornecimento';
import { Employee } from '../../model/employee';
import { of } from 'rxjs';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { User } from '../../model/user';

describe('CadastrarOFComponent', () => {
  let component: CadastrarOFComponent;
  let fixture: ComponentFixture<CadastrarOFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarOFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar os colaboradores', () => {
    var mockColaboradores: User[] = []
    var usuarioService = TestBed.inject(UsuarioService)
    spyOn(usuarioService, 'listarColaboradores').and.returnValue(of(mockColaboradores))

    usuarioService.listarColaboradores()

    expect(usuarioService.listarColaboradores).toBe(of(mockColaboradores))
  })

  it('Deve cadastrar', () => {
    var mockEmployee: Employee = new Employee()
    var mockOF: OrdemFornecimento = {
      codigo: 1,
      employee: mockEmployee,
      description: "",
      status: "",
      created_at: "",
      updated_at: "",
    };
    spyOn(component.realizouCadastro, 'emit')
    spyOn(component.ofService, 'verificarCadastro').and.returnValue(of(mockOF))

    component.cadastrar()

    expect(component.realizouCadastro.emit).toHaveBeenCalledTimes(1)
  })
});
