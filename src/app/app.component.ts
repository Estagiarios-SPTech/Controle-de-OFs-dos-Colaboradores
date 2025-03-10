import { Component } from '@angular/core';

import { FooterComponent } from './componentes/footer/footer.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  imports: [FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Controle-de-OFs-dos-Colaboradores';
}
