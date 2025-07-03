import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { 
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento/ordem-fornecimento.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { OrdemFornecimento } from '../../model/ordemFornecimento';
import { User } from '../../model/user';
import { Employee } from '../../model/employee';

@Component({
  selector: 'app-modal-of',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './modal-of.component.html',
  styleUrl: './modal-of.component.css',
})
export class ModalOfComponent {
  ofService = inject(OrdemFornecimentoService)
  private usuarioService = inject(UsuarioService)
  status = ["Pendente de Cadastramento", "Iniciada", "Validada"]
  colaboradores:User[] = []
  dadoRecebido = inject(MAT_DIALOG_DATA)
  fb = inject(FormBuilder)
  ordemFornecimento = this.fb.group({
    codigo: this.dadoRecebido.ordemFornecimento.codigo,
    employee: this.dadoRecebido.ordemFornecimento.employee.user.id,
    status: this.dadoRecebido.ordemFornecimento.status,
    description: this.dadoRecebido.ordemFornecimento.description,
    created_at: this.dadoRecebido.ordemFornecimento.created_at,
    updated_at: this.dadoRecebido.ordemFornecimento.updated_at
  })

  ngOnInit(){
    this.usuarioService.listarColaboradores().subscribe(
      retorno => {
        this.colaboradores = retorno

      })
  }

  alterarOf(obj:FormGroup){
    var employee = new Employee()
    employee.user.id = this.ordemFornecimento.value.employee as number
    this.ordemFornecimento.get('employee')?.setValue(employee)
    console.log(obj.value)
    this.ofService.verificarAlteracao(obj.value)
    .subscribe()
  }
}
