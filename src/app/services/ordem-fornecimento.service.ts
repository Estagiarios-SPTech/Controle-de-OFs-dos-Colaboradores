import { Injectable } from '@angular/core';

export interface ordemFornecimento {
  id: string;
  colaborador: string;
  descricao: string;
  status: string;
  criacao: string;
  atualizacao: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrdemFornecimentoService {

  constructor() { 
  }

    ordemFornecimentos: ordemFornecimento[] = [
      {
        id: '1',
        colaborador: 'Fabio',
        descricao: 'Instalação de Software',
        status: 'Iniciada',
        criacao: '20/02/2025',
        atualizacao: '25/02/2025'
      },
      {
        id: '2',
        colaborador: 'Shirley',
        descricao: 'Manutenção da impressora',
        status: 'Iniciada',
        criacao: '15/01/2025',
        atualizacao: '23/02/2025'
      },
      
    ]
}
