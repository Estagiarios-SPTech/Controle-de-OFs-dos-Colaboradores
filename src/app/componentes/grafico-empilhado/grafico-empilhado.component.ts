import { Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { UsuarioService} from '../../services/usuario/usuario.service';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento/ordem-fornecimento.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-grafico-empilhado',
  imports: [],
  templateUrl: './grafico-empilhado.component.html',
  styleUrl: './grafico-empilhado.component.css'
})
export class GraficoEmpilhadoComponent implements OnInit {
  usuarioService = inject(UsuarioService)
  ofService = inject(OrdemFornecimentoService)
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

  auth = inject(AuthService)

  carregarOrdemFornecimento():void{
    this.ofService.vericarLista(this.auth.getId()as number)
    .subscribe(retorno => {
      this.ofService.ordemFornecimentos = retorno,
      console.log(this.ofService.ordemFornecimentos)});
  }

  criarGrafico(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ordem de Serviço', 'Usuários'],
        datasets: [{
          data: [this.ofService.ordemFornecimentos.length, this.quantidadeUsuarios],
          backgroundColor: [
            '#FBBC04',
            '#8D34F9',
          ],
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
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
    this.carregarOrdemFornecimento();
    this.carregarUsuarios();
  }
}
  
  

