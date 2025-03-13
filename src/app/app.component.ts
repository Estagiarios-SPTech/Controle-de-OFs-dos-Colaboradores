import { Component } from '@angular/core';
import { FooterComponent } from './componentes/footer/footer.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { OrdemFornecimentoComponent } from './paginas/ordem-fornecimento/ordem-fornecimento.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
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
