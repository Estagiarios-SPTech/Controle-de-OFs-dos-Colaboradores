import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosUsuarioComponent } from './form-dados-usuario.component';

describe('FormDadosUsuarioComponent', () => {
  let component: FormDadosUsuarioComponent;
  let fixture: ComponentFixture<FormDadosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDadosUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDadosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
