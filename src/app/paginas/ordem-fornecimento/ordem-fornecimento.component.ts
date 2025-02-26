import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ordem-fornecimento',
  imports: [CommonModule, FormsModule],
  templateUrl: './ordem-fornecimento.component.html',
  styleUrl: './ordem-fornecimento.component.css'
})
export class OrdemFornecimentoComponent {
  ordemFornecimentos = [
    {
    id: 1,
    colaborador: 'Fabio',
    descricao: 'Instalação de Software',
    status: 'Iniciada',
    criacao: '20/02/2025',
    atualizacao: '25/02/2025'
    },
    {
      id: 2,
      colaborador: 'Shirley',
      descricao: 'Manutenção da impressora',
      status: 'Iniciada',
      criacao: '15/01/2025',
      atualizacao: '23/02/2025'
      },
  ]

  id = 3;
  colaborador = "";
  descricao = "";
  status = "Pendente de Cadastramento";
  criacao = "";

  dataAtual: Date = new Date();
  adicionarOf(){
    this.ordemFornecimentos.push({id: this.id,
                                  colaborador: this.colaborador,
                                  descricao: this.descricao,
                                  status: this.status,
                                  criacao: this.dataAtual.toLocaleDateString(),
                                  atualizacao: ""})
      this.id++;
  }

  idProcurado = 0;
  statusProcurado = "Pendente de Cadastramento";
  colaboradorProcurado = "";
  criacaoProcurado = "";
}
