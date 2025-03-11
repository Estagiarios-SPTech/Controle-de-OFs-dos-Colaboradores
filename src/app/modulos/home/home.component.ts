import { Component } from '@angular/core';
import { CardComponent } from '../../componentes/card/card.component';
import { ConsultarUsuarioComponent } from '../../componentes/consultar-usuario/consultar-usuario.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, ConsultarUsuarioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
