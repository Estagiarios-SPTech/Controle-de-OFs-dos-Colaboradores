import { Component } from '@angular/core';
import { CardComponent } from '../../componentes/card/card.component';
import { GraficoEmpilhadoComponent } from '../../componentes/grafico-empilhado/grafico-empilhado.component';
import { RouterLink } from '@angular/router';
import { GraficoPieOfComponent } from '../../componentes/grafico-pie-of/grafico-pie-of.component';
import { CardAzulComponent } from "../../componentes/card-azul/card-azul.component";
import { GraficoBarraOfComponent } from "../../grafico-barra-of/grafico-barra-of.component";

@Component({
  selector: 'app-home',
  imports: [CardComponent, GraficoEmpilhadoComponent,
    RouterLink, GraficoPieOfComponent,
    CardAzulComponent, GraficoBarraOfComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  
}
