
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-usuario-cadastrado',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './modal-usuario-cadastrado.component.html',
  styleUrl: './modal-usuario-cadastrado.component.css'
})
export class ModalUsuarioCadastradoComponent {
  dadoRecebido = inject(MAT_DIALOG_DATA)
  email = this.dadoRecebido.usuarioCriado.email
  senha = this.dadoRecebido.usuarioCriado.password;
}
