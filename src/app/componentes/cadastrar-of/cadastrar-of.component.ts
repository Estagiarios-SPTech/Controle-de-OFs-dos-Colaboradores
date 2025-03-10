import { Component, inject} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento.service';

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
  dataAtual: Date = new Date;

  ofService = inject(OrdemFornecimentoService)
  criarOf(){
    //Esta execuntando mesmo com os campos vazios
    this.ofService.ordemFornecimentos.push({
      id: this.id.toString(),
      colaborador: this.colaborador,
      descricao: this.descricao,
      status: this.statusEscolhido,
      criacao: this.dataAtual.toLocaleDateString(),
      atualizacao: ''
    })
    this.id++
    console.log(this.ofService.ordemFornecimentos)
  }
}
