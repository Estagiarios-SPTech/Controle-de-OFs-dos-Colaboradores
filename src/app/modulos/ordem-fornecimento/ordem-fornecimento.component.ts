import { Component } from '@angular/core';

import { CadastrarOFComponent } from '../../componentes/cadastrar-of/cadastrar-of.component';
import { ConsultarOFComponent } from '../../componentes/consultar-of/consultar-of.component';

@Component({
  selector: 'app-ordem-fornecimento',
  imports: [CadastrarOFComponent, ConsultarOFComponent],
  templateUrl: './ordem-fornecimento.component.html',
  styleUrl: './ordem-fornecimento.component.css'
})
export class OrdemFornecimentoComponent {
 
}
