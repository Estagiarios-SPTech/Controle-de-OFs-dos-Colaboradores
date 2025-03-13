import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';


@Component({
  selector: 'app-ordens-de-servico',
  imports: [MatCardModule,],
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
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(168, 0, 64)',
            'rgb(78, 138, 0)',
            'rgb(231, 162, 1)'
          ],
          borderWidth: 1,
          borderColor: '#333', 
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                size: 14,
                weight: 'normal',
                family: 'Helvetica',
              },
              usePointStyle: true,
              color: '#333',
              boxWidth: 10,
              boxHeight: 10,
              padding: 10,
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
          backgroundColor: [
            'rgba(76, 0, 255, 0.2)',
            'rgba(76, 0, 255, 0.2)',
            'rgba(76, 0, 255, 0.2)',
            'rgba(76, 0, 255, 0.2)',
            'rgba(76, 0, 255, 0.2)',
            'rgba(76, 0, 255, 0.2)'

          ],
          borderColor: [
            'rgb(99, 33, 255)',
            'rgb(99, 33, 255)',
            'rgb(99, 33, 255)',
            'rgb(99, 33, 255)',
            'rgb(99, 33, 255)',
            'rgb(99, 33, 255)'
          ],
          borderWidth: 1
        }]
      }, 
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                weight: 'normal',
                family: 'Helvetica',
              },
              borderRadius: 2,
              color: '#333',
              boxWidth: 10,
              boxHeight: 10,
              padding: 10,
            }
          }
        }
      }
    })

  }
}
