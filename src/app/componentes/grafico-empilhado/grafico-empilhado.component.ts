import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico-empilhado',
  imports: [],
  templateUrl: './grafico-empilhado.component.html',
  styleUrl: './grafico-empilhado.component.css'
})
export class GraficoEmpilhadoComponent implements OnInit {
  ngOnInit() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ordem de Serviço', 'Colaborador'],
        datasets: [{
          data: [20, 10],
          backgroundColor: [
            '#FBBC04',
            '#8D34F9',
          ],
        }]
      },
      options: {
        // Deixar na vertical
        indexAxis: 'y',
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins:{
          title: {
            display: true,
            text: 'Colaborador X OF',
            font:{
              size: 24,
            }
          },
          legend:{
            display: false,
          }
        }
      }
    });
  }
}
