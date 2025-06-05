import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { User } from '../../model/User';
import { of, throwError } from 'rxjs';

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
});
