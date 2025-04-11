import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-ordens-de-servico',
  imports: [MatCardModule],
  templateUrl: './ordens-de-servico.component.html',
  styleUrl: './ordens-de-servico.component.css'
})
export class OrdensDeServicoComponent implements OnInit {
  chart: Chart | undefined;
  chartBar: Chart | undefined;

  ngOnInit() {
    const ctx = document.getElementById('chart-pie') as HTMLCanvasElement;
    const ctx2 = document.getElementById('chart-bars') as HTMLCanvasElement;

    OrdensDeServicoComponent.constructor(); {
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
