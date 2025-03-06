import { Component} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-of',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './cadastrar-of.component.html',
  styleUrl: './cadastrar-of.component.css'
})
export class CadastrarOFComponent {
  id = 3
  colaborador = ""
  descricao = ""
  status = ["Pendente de Cadastramento", "Iniciada", "Validada"]
  statusEscolhido = ""
}
