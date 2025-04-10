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

  teste(texto: string): void {
    console.log(texto);
  }

  // newCadastro(user: User): void {
  //   console.log(user);
  //   this.usuarioService.signUp(user).subscribe(retorno => console.log(retorno));
  //   if (this.cargo === 'Colaborador') {
      
      
  //     // let rtId: number | undefined;
  //     let theManager: User;
      
  //     // const rtSelecionado = this.rts.find(r => r.name === this.selectRt);
  //     // if (rtSelecionado && rtSelecionado.id !== undefined) {
  //     //   rtId = rtSelecionado.id;
  //     // }
      
  //     const managerSelecionado = this.managers.find(m => m.name === this.selectManager);
  //     if (managerSelecionado && managerSelecionado !== undefined) {
  //     theManager = managerSelecionado;

  //     }

  //     this.employee.id = 0;
  //     this.employee.employee = user;
  //     this.employee.manager = ;

      
     
  //     this.employeeService.cadastrarEmployee(this.employee)
  //   }
  // }

  // cadastrar(): void {
  //   const user: User = {
  //     id: 0,
  //     name: this.nome,
  //     email: this.email,
  //     role: this.cargo
  //   };

  //   console.log(this.variavel);
  //   // primeiro cadastra o usuário, depois cadastra o funcionário
  //   this.usuarioService.signUp(user).pipe(
  //     switchMap(usuarioCriado => {
  //       console.log(this.variavel);
  //       let managerId: number | null = null;
  //       let rtId: number | null = null;

  //       if (this.cargo === 'Colaborador') {
  //         if (this.selectManager) {
  //           const managerSelecionado = this.managers.find(m => m.name === this.selectManager);
  //           if (managerSelecionado && managerSelecionado !== undefined) {
  //             managerId = managerSelecionado.id;
  //           }
  //         }

  //         if (this.selectRt) {
  //           const rtSelecionado = this.rts.find(r => r.name === this.selectRt);
  //           if (rtSelecionado && rtSelecionado.id !== undefined) {
  //             rtId = rtSelecionado.id;
  //           }
  //         }
  //       }

  //         const employeeData = new Employee();
  //         employeeData.id = 0;  
  //         employeeData.fk_user = usuarioCriado.id;
  //         employeeData.fk_manager = managerId;
  //         employeeData.fk_rt = rtId;
  //         employeeData.status = 'Disponível'; // padrão

  //         console.log(employeeData)

  //       return this.employeeService.cadastrarEmployee(employeeData);
  //     })
  //   ).subscribe({
  //     next: (employeeResponse) => {
  //       console.log('Usuário e funcionário cadastrados com sucesso', employeeResponse);
  //       this.resetForm();
  //     },
  //     error: (error) => {
  //       console.error('Erro ao cadastrar usuário ou funcionário', error);
  //     }
  //   });
  // }

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



