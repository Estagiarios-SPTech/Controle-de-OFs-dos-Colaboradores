import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico-barra-of',
  imports: [],
  templateUrl: './grafico-barra-of.component.html',
  styleUrl: './grafico-barra-of.component.css'
})
export class GraficoBarraOfComponent {
  chartBar: Chart | undefined;

  ngOnInit() {
    const ctx2 = document.getElementById('chart-bars') as HTMLCanvasElement;

    GraficoBarraOfComponent.constructor(); {
      // Register all required Chart.js components globally
      Chart.register(...registerables);
    }

    this.chartBar = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            datasets: [{
              label: 'Ordens de Fornecimento',
              data: [65, 59, 80, 81, 56, 55, 40],
              borderWidth: 1,
              backgroundColor: '#A642F4'
            }]
          }, 
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales:{
              x:{
                grid:{
                  display: false
                },
                ticks:{
                  font:{
                    size: 15,
                    weight: 'bold'
                  }
                }
              },
              y:{
                border:{
                  display: false
                }
              }
            },
            plugins: {
              legend: {
                display: false,
              },
              title:{
                display: true,
                text: 'Quantidade Mensal',
                font:{
                  size: 20
                }
              },
              datalabels:{
                display: false
              }
            }
          }
        })
  }
}
