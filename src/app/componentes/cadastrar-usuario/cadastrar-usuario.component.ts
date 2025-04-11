import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { Observable, switchMap } from 'rxjs';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

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
  rt = "";
  manager = "";
  //preciso fazer com que primeiro seja feito o cadastro do usuario, e assim que o cadastro for realizado ele cadastre logo em seguida no employee

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

  // teste(texto: string): void {
  //   console.log(texto);
  // }
onManagerSelect(managerName: string): void {
  this.selectedManagerObj = this.managers.find(m => m.name === this.selectManager) || null;
  this.selectManager = managerName;
}

onRtSelect(rtName: string): void {
  this.selectedRtObj = this.rts.find(r => r.name === rtName) || null;
  this.selectRt = rtName;
}

  cadastrar(): void {
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
        }
        console.log("employee esta sendo enviado:", this.employee)

        this.employee.employee = usuarioCriado;
        this.employee.status = "Disponivel";

          this.employeeService.cadastrarEmployee(this.employee).subscribe({
            next: (employeeCriado) => {
              console.log('Employee cadastrado com sucesso:', employeeCriado);
              this.resetForm();
            },
            error: (error) => {
              console.error('Erro ao cadastrar employee:', error);
            }
          
        });
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    });
     {
          
      // const rtSelecionado = this.rts.find(r => r.name === this.selectRt);
      // if (rtSelecionado && rtSelecionado.id !== undefined) {
      //   rtId = rtSelecionado.id;
      // }    
    }
  }

  private resetForm(): void {
    this.nome = '';
    this.email = '';
    this.cargo = '';
    this.rt = '';
    this.manager = '';
    this.selectManager = "";
    this.selectRt = "";
  }
}



