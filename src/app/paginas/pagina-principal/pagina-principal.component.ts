import { Component } from '@angular/core';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';
import { FooterComponent } from '../../componentes/footer/footer.component';

@Component({
  selector: 'app-pagina-principal',
  imports: [SidebarComponent, FooterComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

}
