import { Component } from '@angular/core';
import { CardComponent } from '../../componentes/card/card.component';
import { ConsultarUsuarioComponent } from '../../componentes/consultar-usuario/consultar-usuario.component';
import { GraficoEmpilhadoComponent } from '../../componentes/grafico-empilhado/grafico-empilhado.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CardComponent, ConsultarUsuarioComponent, GraficoEmpilhadoComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  
}
