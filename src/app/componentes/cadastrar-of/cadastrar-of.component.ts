import { Component, inject} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento.service';
import { OrdemFornecimento } from '../../model/ordem-fornecimento';

@Component({
  selector: 'app-cadastrar-of',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './cadastrar-of.component.html',
  styleUrl: './cadastrar-of.component.css'
})
export class CadastrarOFComponent {
  status = ["Pendente de Cadastramento", "Iniciada", "Validada"]

  ofService = inject(OrdemFornecimentoService)
  ordemFornecimento = new OrdemFornecimento()

  cadastrar(){
    this.ofService.cadastrar(this.ordemFornecimento);
  }
}
