import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarUsuarioComponent } from './consultar-usuario.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { of } from 'rxjs';

describe('ConsultarUsuarioComponent', () => {
  let component: ConsultarUsuarioComponent;
  let fixture: ComponentFixture<ConsultarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar filtro', () => {
    const event = {
      target: {
        value: 'texto de filtro'
      }
    } as unknown as Event;

    component.applyFilter(event)

    expect(component.dataSource.filter).toBe('texto de filtro')
  })

  it('Deve carregar os usuários', () => {
    var users: User[] = []
    spyOn(component.usuarioService, 'select').and.returnValue(of(users))

    component.ngOnInit()

    expect(component.dataSource.data).toEqual(users)
  })
});
