import { Component, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OrdemFornecimentoService } from '../services/ordem-fornecimento/ordem-fornecimento.service';

@Component({
  selector: 'app-grafico-barra-of',
  imports: [],
  templateUrl: './grafico-barra-of.component.html',
  styleUrl: './grafico-barra-of.component.css'
})
export class GraficoBarraOfComponent {
  chartBar: Chart | undefined;
  ofService = inject(OrdemFornecimentoService)
  mesesPorEscrito: string[] = []
  meses: number[] = []
  quantidade: number[] = []

  ngOnInit() {
    this.pegarQuantidadePorMes()
  }

  pegarQuantidadePorMes():void{
    this.ofService.verificarQuantidadePorMes().subscribe(retorno => {
      this.ofService.listaOrdemFornecimentoMes = retorno
      this.meses = this.ofService.listaOrdemFornecimentoMes.map(ordemFornecimentoMes => ordemFornecimentoMes.mes)
      this.quantidade = this.ofService.listaOrdemFornecimentoMes.map(ordemFornecimentoMes => ordemFornecimentoMes.quantidade)
      this.converterParaMesEscrito()
      this.gerarGrafico()
    })
  }

  converterParaMesEscrito(){
    for(var i = this.meses.length; i >= 0; i--){
      switch(this.meses[i]){
        case 1:
          this.mesesPorEscrito.push("Janeiro")
          break;
        case 2:
          this.mesesPorEscrito.push("Fevereiro")
          break;
        case 3:
          this.mesesPorEscrito.push("Março")
          break;
        case 4:
          this.mesesPorEscrito.push("Abril")
          break;
        case 5:
          this.mesesPorEscrito.push("Maio")
          break;
        case 6:
          this.mesesPorEscrito.push("Junho")
          break;
        case 7:
          this.mesesPorEscrito.push("Julho")
          break;
        case 8:
          this.mesesPorEscrito.push("Agosto")
          break;
        case 9:
          this.mesesPorEscrito.push("Setembro")
          break;
        case 10:
          this.mesesPorEscrito.push("Outubro")
          break;
        case 11:
          this.mesesPorEscrito.push("Novembro")
          break;
        case 12:
          this.mesesPorEscrito.push("Dezembro")
          break;
      }
    }
  }

  gerarGrafico(){
    const ctx2 = document.getElementById('chart-bars') as HTMLCanvasElement;
    this.chartBar = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: this.mesesPorEscrito,
            datasets: [{
              label: 'Ordens de Fornecimento',
              data: this.quantidade,
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
