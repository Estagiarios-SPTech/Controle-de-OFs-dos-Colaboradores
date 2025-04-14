import { Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-grafico-empilhado',
  imports: [],
  templateUrl: './grafico-empilhado.component.html',
  styleUrl: './grafico-empilhado.component.css'
})
export class GraficoEmpilhadoComponent implements OnInit {
  usuarioService = inject(UsuarioService)
  usuarios: any[] = [];
  quantidadeUsuarios: number = 0;
  chart: Chart | null = null;
 
  carregarUsuarios(): void {
    this.usuarioService.select().subscribe(
      (data) => {
        this.usuarios = data;
        this.quantidadeUsuarios = data.length; 
        this.criarGrafico();
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }
  criarGrafico(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ordem de Serviço', 'Usuários'],
        datasets: [{
          data: [20, this.quantidadeUsuarios], // Usando a quantidade de usuários aqui
          backgroundColor: [
            '#FBBC04',
            '#8D34F9',
          ],
        }]
      },
      options: {
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
          },
          datalabels:{
            display: false
          }
        }
      }
    });
  }

  ngOnInit() {
    this.carregarUsuarios();
  }
}
  
  

