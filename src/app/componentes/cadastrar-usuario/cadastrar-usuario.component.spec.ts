import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { User } from '../../model/user';
import { of, throwError } from 'rxjs';
import { Employee } from '../../model/employee';

fdescribe('CadastrarUsuarioComponent', () => {
  let component: CadastrarUsuarioComponent;
  let fixture: ComponentFixture<CadastrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarUsuarioComponent);
    component = fixture.componentInstance;
    
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve chamar loadManagers e loadRts ao carregar o ngOnInit', () => {
    spyOn(component, 'loadManagers');
    spyOn(component, 'loadRts');

    component.ngOnInit()

    expect(component.loadManagers).toHaveBeenCalled();
    expect(component.loadRts).toHaveBeenCalled();
  });

  it('Deve carregar os gerentes', () => {
    var gerentes: User[] = []

    spyOn(component.usuarioService, 'selectManager').and.returnValue(of(gerentes))

    component.loadManagers()
  
    expect(component.managers).toBe(gerentes)
  });

  it('Deve gerar erro ao carregar os gerentes', () => {
    spyOn(console, 'error');
    spyOn(component.usuarioService, 'selectManager').and.returnValue(throwError(() => new Error));
    
    component.loadManagers();
    
    expect(console.error).toHaveBeenCalledWith('Erro ao carregar dados', jasmine.any(Error));
  });

  it('Deve carregar os RTs', () => {
    var rts: User[] = []

    spyOn(component.usuarioService, 'selectRt').and.returnValue(of(rts))

    component.loadRts()
  
    expect(component.rts).toBe(rts)
  });

  it('Deve gerar erro ao carregar os RTs', () => {
    spyOn(console, 'error');
    spyOn(component.usuarioService, 'selectRt').and.returnValue(throwError(() => new Error));
    
    component.loadRts();
    
    expect(console.error).toHaveBeenCalledWith('Erro ao carregar dados', jasmine.any(Error));
  });

  it('Deve não conseguir cadastrar usuario', () =>{
    spyOn(console, 'error');
    spyOn(component.usuarioService, 'signUp').and.returnValue(throwError(() => new Error));
    
    // component.cadastrar();
    
    expect(console.error).toHaveBeenCalledWith('Erro ao cadastrar usuário:', jasmine.any(Error));
  })

  it('Deve conseguir cadastrar usuário', () => {
    var user = new User();
    spyOn(component.usuarioService, 'signUp').and.returnValue(of(user));
    spyOn(console, 'log');

    // component.cadastrar();

    expect(console.log).toHaveBeenCalledWith('cadastro feito com sucesso' + user);
  })


  it('Deve conseguir cadastrar usuário colaborador', () => {
    var user = new User()
    user.role = "Colaborador";
    // component.user = user;
    var employee = new Employee()
    component.selectManager = "Fabio"
    component.selectRt = "Shirley"
    spyOn(component.usuarioService, 'signUp').and.returnValue(of(user));
    spyOn(console, 'log')
    spyOn(component.employeeService, 'cadastrarEmployee').and.returnValue(of(employee))

    // component.cadastrar();

    expect(console.log).toHaveBeenCalledWith('Employee cadastrado com sucesso:', employee)
  })

  it('Deve conseguir não cadastrar usuário colaborador', () => {
    var user = new User()
    user.role = "Colaborador";
    // component.user = user;
    var employee = new Employee()
    component.selectManager = "Fabio"
    component.selectRt = "Shirley"
    spyOn(component.usuarioService, 'signUp').and.returnValue(of(user));
    spyOn(console, 'error')
    spyOn(component.employeeService, 'cadastrarEmployee').and.returnValue(throwError(() =>new Error()))

    // component.cadastrar();

    expect(console.error).toHaveBeenCalledWith('Erro ao cadastrar employee:', jasmine.any(Error))
  })
});
