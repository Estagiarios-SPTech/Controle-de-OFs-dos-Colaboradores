import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent, MyErrorStateMatcher } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map())
          }
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Responsividade', () => {
    it('deve inicializar com coluna=2 e rowspan=1 para telas largas', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1200);
      component.alterarColuna();
      
      expect(component.coluna).toBe(2);
      expect(component.rowspan).toBe(1);
    });

    it('deve mudar para coluna=1 e rowspan=4 para telas estreitas', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(800);
      component.alterarColuna();
      
      expect(component.coluna).toBe(1);
      expect(component.rowspan).toBe(4);
    });

    it('deve responder ao evento de redimensionamento da janela', () => {
      spyOn(component, 'alterarColuna');
      
      window.dispatchEvent(new Event('resize'));
      
      expect(component.alterarColuna).toHaveBeenCalled();
    });
  });

  describe('Validaçoes de Email', () => {
    it('deve validar email vazio como inválido', () => {
      component.emailFormControl.setValue('');
      expect(component.emailFormControl.valid).toBeFalsy();
      expect(component.emailFormControl.hasError('required')).toBeTruthy();
    });

    it('deve validar email com formato inválido', () => {
      component.emailFormControl.setValue('email-invalido');
      expect(component.emailFormControl.valid).toBeFalsy();
      expect(component.emailFormControl.hasError('email')).toBeTruthy();
    });

    it('deve validar email com formato válido', () => {
      component.emailFormControl.setValue('usuario@exemplo.com');
      expect(component.emailFormControl.valid).toBeTruthy();
    });
  });

  describe('Validações de Senha', () => {
    it('deve validar senha vazia como inválida', () => {
      component.passwordFormControl.setValue('');
      expect(component.passwordFormControl.valid).toBeFalsy();
      expect(component.passwordFormControl.hasError('required')).toBeTruthy();
    });

    it('deve validar senha com menos de 8 caracteres como invalida', () => {
      component.passwordFormControl.setValue('Abc123!');
      expect(component.passwordFormControl.valid).toBeFalsy();
      expect(component.passwordFormControl.hasError('minlength')).toBeTruthy();
    });

    it('deve validar senha sem letra maiúscula como inválida', () => {
      component.passwordFormControl.setValue('abcdefg1!');
      expect(component.passwordFormControl.valid).toBeFalsy();
      expect(component.passwordFormControl.hasError('pattern')).toBeTruthy();
    });

    it('deve validar senha sem letra minúscula como inválida', () => {
      component.passwordFormControl.setValue('ABCDEFG1!');
      expect(component.passwordFormControl.valid).toBeFalsy();
      expect(component.passwordFormControl.hasError('pattern')).toBeTruthy();
    });

    it('deve validar senha sem numero como inválida', () => {
      component.passwordFormControl.setValue('ABCdefg!@');
      expect(component.passwordFormControl.valid).toBeFalsy();
      expect(component.passwordFormControl.hasError('pattern')).toBeTruthy();
    });

    it('deve validar senha sem caractere especial como inválida', () => {
      component.passwordFormControl.setValue('ABCdefg123');
      expect(component.passwordFormControl.valid).toBeFalsy();
      expect(component.passwordFormControl.hasError('pattern')).toBeTruthy();
    });

    it('deve validar senha com todos os requisitos como válida', () => {
      component.passwordFormControl.setValue('Abcdefg1!');
      expect(component.passwordFormControl.valid).toBeTruthy();
    });
  });

  describe('Validação do formulário', () => {
    it('deve marcar os campos como touched ao validar o formulário', () => {
      component.emailFormControl.markAsUntouched();
      component.passwordFormControl.markAsUntouched();
      
      expect(component.emailFormControl.touched).toBeFalsy();
      expect(component.passwordFormControl.touched).toBeFalsy();
      
      component.validateForm();
      
      expect(component.emailFormControl.touched).toBeTruthy();
      expect(component.passwordFormControl.touched).toBeTruthy();
    });
  });

  describe('MyErrorStateMatcher', () => {
    let matcher: MyErrorStateMatcher;
    let control: FormControl;
    
    beforeEach(() => {
      matcher = new MyErrorStateMatcher();
      control = new FormControl('');
    });
    
    it('deve retornar false quando o controle é válido', () => {
      control.setErrors(null);
      expect(matcher.isErrorState(control, null)).toBeFalsy();
    });
    
    it('deve retornar true quando o controle é inválido e dirty', () => {
      control.setErrors({ required: true });
      control.markAsDirty();
      expect(matcher.isErrorState(control, null)).toBeTruthy();
    });
    
    it('deve retornar true quando o controle é inválido e touched', () => {
      control.setErrors({ required: true });
      control.markAsTouched();
      expect(matcher.isErrorState(control, null)).toBeTruthy();
    });
    
    it('deve retornar true quando o controle é inválido e o formulário foi submetido', () => {
      control.setErrors({ required: true });
      const formMock = { submitted: true } as NgForm;
      expect(matcher.isErrorState(control, formMock)).toBeTruthy();
    });
    
    it('deve retornar false quando o controle é inválido mas não está dirty, touched e o formulário não foi submetido', () => {
      control.setErrors({ required: true });
      expect(matcher.isErrorState(control, null)).toBeFalsy();
    });
  });

  describe('Inicialização do Componente', () => {
    it('deve definir a largura inicial corretamente', () => {
      expect(component.width).toEqual(window.innerWidth);
    });

    // it('deve chamar alterarColuna durante a inicialização', () => {
    //   const newComponent = new LoginComponent();
    //   spyOn(newComponent, 'alterarColuna');
      
    //   newComponent.width = window.innerWidth;
    //   newComponent.alterarColuna();
      
    //   expect(newComponent.alterarColuna).toHaveBeenCalled();
    // });
  });
});