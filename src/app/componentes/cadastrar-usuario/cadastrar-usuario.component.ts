import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioCadastradoComponent } from '../modal-usuario-cadastrado/modal-usuario-cadastrado.component';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-cadastrar-usuario',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatButtonModule, MatDividerModule, MatIconModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastrarUsuarioComponent {
  managers: User[] = [];
  rts: User[] = [];

  selectManager: string = '';
  selectRt: string | null = null;

  selectedManagerObj: User | null = null;
  selectedRtObj: User | null = null;

  constructor(public usuarioService: UsuarioService, public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadManagers();
    this.loadRts();
  }

  loadManagers(): void {
    this.usuarioService.selectManager().subscribe({
      next: (data) => {
        this.managers = data;
      },
      error: (error) => {
        console.error("Erro ao carregar dados", error);
      }
    });

  }
  loadRts(): void {
    this.usuarioService.selectRt().subscribe({
      next: (data) => {
        this.rts = data;
      },
      error: (error) => {
        console.error("Erro ao carregar dados", error);
      }
    });

  }

  fb = inject(FormBuilder)

  user = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    password: '',
    selectManager: '',
    selectRt: '',
  })

  employee: Employee = new Employee();
  snackbarService = inject(SnackbarService)

  cadastrar(formulario: FormGroupDirective): void {
    if(this.user.invalid){
      console.log("invalido")
      return;
    }
    this.usuarioService.verificarEmailExistente(this.user.value.email as string).subscribe(
      emailEncontrado => {
        if(emailEncontrado == true){
          this.snackbarService.openSnackBar("E-mail já cadastrado")
        }
        else{
          this.user.value.password = crypto.randomUUID().substring(0, 7);
          console.log(this.user)
          if (this.user.value.role != 'Colaborador'){
            this.usuarioService.signUp(this.user.value as User).subscribe({
              next: (usuarioCriado) => {
                console.log("cadastro feito com sucesso" + usuarioCriado);
                this.abrirModal(this.user.value as User);
                this.resetForm(formulario)
              },
              error: (error) => {
                console.error('Erro ao cadastrar usuário:', error);
              }
            });
          }
          else {
            if(this.selectManager){
              this.employee.manager = {name: this.selectManager} as User;
            }

            if (this.selectRt) {
              this.employee.rt = { name: this.selectRt } as User;
            }
            console.log("employee esta sendo enviado:", this.employee)

            this.employee.user = this.user.value as User;
            this.employee.status = "Disponivel";
            this.employee.manager.email = this.user.value.selectManager as string
            this.employee.rt.email = this.user.value.selectRt as string

              this.employeeService.cadastrarEmployee(this.employee).subscribe({
                next: (employeeCriado) => {
                  console.log('Employee cadastrado com sucesso:', employeeCriado);
                  this.abrirModal(this.user.value as User);
                  this.resetForm(formulario)
                },
                error: (error) => {
                  console.error('Erro ao cadastrar employee:', error);
                }
                
              });
          }
        }
      }
    )

    
  }
 
  resetForm(formulario: FormGroupDirective): void {
    formulario.resetForm();
  }

  readonly dialog = inject(MatDialog);
  @Output() realizouCadastro = new EventEmitter<void>(); 

  abrirModal(usuarioCriado: User){
    this.dialog.open(ModalUsuarioCadastradoComponent,{
      width: '600px',
      data: {usuarioCriado}
    });

    this.dialog.afterAllClosed.subscribe(() => this.realizouCadastro.emit())
  }
}



