import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafico-pie-of',
  imports: [],
  templateUrl: './grafico-pie-of.component.html',
  styleUrl: './grafico-pie-of.component.css'
})
export class GraficoPieOfComponent implements OnInit {
  chart: Chart | undefined;

  ngOnInit() {
    const ctx = document.getElementById('chart-pie') as HTMLCanvasElement;

    GraficoPieOfComponent.constructor(); {
      // Register all required Chart.js components globally
      Chart.register(...registerables);
      Chart.register(ChartDataLabels);
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Pendente de Cadastramento',
          'Validada',
          'Iniciada'
        ],
        datasets: [{
          data: [45, 20, 35],
          backgroundColor: [
            '#6168EC',
            '#4d52bf',
            '#323680'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
              left: 20,
              right: 20
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
              font: {
                size: 14,
                weight: 'normal',
                family: 'Helvetica',
              },
              usePointStyle: true,
              color: '#333',
              boxWidth: 20,
              boxHeight: 10,
            }
          },
          title:{
            display: true,
            text: 'Tipos',
            font:{
              size: 20
            }
          },
          datalabels: { 
            color: '#fff',
            font:{
              size: 20
            }
          }
        }
      }
    });
  }
}
