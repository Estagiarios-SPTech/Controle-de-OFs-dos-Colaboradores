import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../model/User';
import { UsuarioService } from '../../services/usuario.service';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioCadastradoComponent } from '../modal-usuario-cadastrado/modal-usuario-cadastrado.component';

@Component({
  selector: 'app-cadastrar-usuario',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastrarUsuarioComponent {
  nome = "";
  email = "";
  cargo = "";
  senha = "";
  rt = "";
  manager = "";

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

  user: User = new User();
  employee: Employee = new Employee();

  cadastrar(): void {
    this.user.password = crypto.randomUUID().substring(0, 7);
    console.log(this.user)
    this.usuarioService.signUp(this.user).subscribe({
      next: (usuarioCriado) => {
        console.log("cadastro feito com sucesso" + this.user);
        
        if (this.user.role === 'Colaborador') {
          if(this.selectManager){
            this.employee.manager = {name: this.selectManager} as User;
          }

          if (this.selectRt) {
            this.employee.rt = { name: this.selectRt } as User;
          }
          console.log("employee esta sendo enviado:", this.employee)
  
          this.employee.user = usuarioCriado;
          this.employee.status = "Disponivel";
  
            this.employeeService.cadastrarEmployee(this.employee).subscribe({
              next: (employeeCriado) => {
                console.log('Employee cadastrado com sucesso:', employeeCriado);
              },
              error: (error) => {
                console.error('Erro ao cadastrar employee:', error);
              }
              
            });
          }
          this.abrirModal(usuarioCriado);
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    });
  }

  resetForm(): void {
    console.log("Fui chamado")
    this.user.name = '';
    this.email = '';
    this.cargo = '';
    this.rt = '';
    this.manager = '';
    this.selectManager = "";
    this.selectRt = "";
  }

  readonly dialog = inject(MatDialog);

  abrirModal(usuarioCriado: User){
    this.dialog.open(ModalUsuarioCadastradoComponent,{
      width: '600px',
      data: {usuarioCriado}
    });

    this.dialog.afterAllClosed.subscribe(() => this.resetForm())
  
  }
}



