import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdemFornecimentoComponent } from './paginas/ordem-fornecimento/ordem-fornecimento.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrdemFornecimentoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Controle-de-OFs-dos-Colaboradores';
}
