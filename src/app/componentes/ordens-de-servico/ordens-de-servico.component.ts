import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables} from 'chart.js';


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
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
  });

  this.chartBar = new Chart (ctx2, {
    type: 'bar',
    data: {
      labels: ['Janeiro','Fevereiro'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    }
  })

}
}
