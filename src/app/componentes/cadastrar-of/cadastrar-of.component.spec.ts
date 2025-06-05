import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarOFComponent } from './cadastrar-of.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OrdemFornecimento } from '../../model/ordemFornecimento';
import { Employee } from '../../model/Employee';
import { of } from 'rxjs';

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

  it('Deve cadastrar', () => {
    var mockEmployee: Employee = new Employee()
    var mockOF: OrdemFornecimento = {
      codigo: 1,
      collaborator: mockEmployee,
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
