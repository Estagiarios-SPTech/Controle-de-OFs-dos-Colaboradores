import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


//  FooterComponent, SidebarComponent, UsuariosComponent, OrdemFornecimentoComponent, HomeComponent, LoginComponent 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Controle-de-OFs-dos-Colaboradores';
}
