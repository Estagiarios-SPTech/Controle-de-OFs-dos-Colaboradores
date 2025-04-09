import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { 
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../services/usuario.service';
import { OrdemFornecimento } from '../../model/ordemFornecimento';

@Component({
  selector: 'app-modal-of',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './modal-of.component.html',
  styleUrl: './modal-of.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalOfComponent {
  ofService = inject(OrdemFornecimentoService)
  usuarioService = inject(UsuarioService)
  status = ["Pendente de Cadastramento", "Iniciada", "Validada"]

  ngOnInit(){
    this.usuarioService.listarNomes()
  }


  alterarOf(obj:OrdemFornecimento){
    this.ofService.verificarAlteracao(obj)
    .subscribe()
  }
}
