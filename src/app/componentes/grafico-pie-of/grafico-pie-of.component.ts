import { Component, inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento/ordem-fornecimento.service';

@Component({
  selector: 'app-grafico-pie-of',
  imports: [],
  templateUrl: './grafico-pie-of.component.html',
  styleUrl: './grafico-pie-of.component.css'
})
export class GraficoPieOfComponent implements OnInit {
  chart: Chart | undefined;
  ofService = inject(OrdemFornecimentoService)
  ofPendente: number = 0;
  ofIniciada: number = 0;
  ofValidada: number = 0;

  carregarPorStatus(status:string, status2:string, status3:string):void{
    this.ofService.verificarQuantidadePorStatus(status)
    .subscribe(retorno => {
      this.ofPendente = retorno
      this.ofService.verificarQuantidadePorStatus(status2)
      .subscribe(retorno => {
        this.ofIniciada = retorno
        this.ofService.verificarQuantidadePorStatus(status3)
        .subscribe(retorno => {
        this.ofValidada = retorno
        this.criarGrafico()
      })
      })
    })
   
  }

  ngOnInit() {
    GraficoPieOfComponent.constructor(); {
      // Register all required Chart.js components globally
      Chart.register(...registerables);
      Chart.register(ChartDataLabels);
    }
    
    this.carregarPorStatus("Pendente de Cadastramento", "Iniciada", "Validada");
    
  }
  criarGrafico(){
    const ctx = document.getElementById('chart-pie') as HTMLCanvasElement;
  
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Pendente de Cadastramento',
          'Iniciada',
          'Validada'
        ],
        datasets: [{
          data: [this.ofPendente, this.ofIniciada, this.ofValidada],
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
