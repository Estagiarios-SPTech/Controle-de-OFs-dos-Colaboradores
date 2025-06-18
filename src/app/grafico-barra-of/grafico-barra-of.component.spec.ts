import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficoBarraOfComponent } from './grafico-barra-of.component';
import { OrdemFornecimentoService } from '../services/ordem-fornecimento.service';
import { of } from 'rxjs';
import { Chart, registerables } from 'chart.js';

describe('GraficoBarraOfComponent', () => {

  let component: GraficoBarraOfComponent;
  let fixture: ComponentFixture<GraficoBarraOfComponent>;
  let ofServiceMock: jasmine.SpyObj<OrdemFornecimentoService>;

  const mockDadosMes = [
    { mes: 1, quantidade: 10 },
    { mes: 2, quantidade: 15 },
    { mes: 3, quantidade: 20 }
  ];

  beforeEach(async () => {
    ofServiceMock = jasmine.createSpyObj('OrdemFornecimentoService',
      ['verificarQuantidadePorMes']);

    ofServiceMock.verificarQuantidadePorMes.and.returnValue(of(mockDadosMes));

    await TestBed.configureTestingModule({
      imports: [GraficoBarraOfComponent],
      providers: [
        { provide: OrdemFornecimentoService, useValue: ofServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoBarraOfComponent);
    component = fixture.componentInstance;

    spyOn(component, 'gerarGrafico').and.callFake(() => { });
  });

  describe('converterParaMesEscrito', () => {
    it('deve converter números de meses para nomes escritos corretamente', () => {
      component.meses = [1, 4, 7];
      component.mesesPorEscrito = [];

      component.converterParaMesEscrito();

      expect(component.mesesPorEscrito).toEqual(['Julho', 'Abril', 'Janeiro']);
    });

    it('deve lidar com todos os meses do ano', () => {
      component.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      component.mesesPorEscrito = [];

      component.converterParaMesEscrito();

      expect(component.mesesPorEscrito).toEqual([
        'Dezembro', 'Novembro', 'Outubro', 'Setembro', 'Agosto', 'Julho', 'Junho', 'Maio', 'Abril', 'Março', 'Fevereiro', 'Janeiro' 
      ]);
    });
  });

  describe('ngOnInit e pegarQuantidadePorMes', () => {
    beforeEach(() => {
      spyOn(component, 'converterParaMesEscrito').and.stub();
    });

    it('ngOnInit deve chamar pegarQuantidadePorMes', () => {
      spyOn(component, 'pegarQuantidadePorMes');

      component.ngOnInit();

      expect(component.pegarQuantidadePorMes).toHaveBeenCalledTimes(1);
    });

    it('deve chamar o serviço verificarQuantidadePorMes', () => {
      component.pegarQuantidadePorMes();

      expect(ofServiceMock.verificarQuantidadePorMes).toHaveBeenCalledTimes(1);
    });

    it('deve atribuir o retorno do serviço à propriedade listaOrdemFornecimentoMes', () => {
      component.pegarQuantidadePorMes();

      expect(ofServiceMock.listaOrdemFornecimentoMes).toEqual(mockDadosMes);
    });

    it('deve extrair os meses do retorno do serviço', () => {
      component.pegarQuantidadePorMes();

      expect(component.meses).toEqual([1, 2, 3]);
    });

    it('deve extrair as quantidades do retorno do serviço', () => {
      component.pegarQuantidadePorMes();

      expect(component.quantidade).toEqual([10, 15, 20]);
    });

    it('deve chamar converterParaMesEscrito após processar os dados', () => {
      component.pegarQuantidadePorMes();

      expect(component.converterParaMesEscrito).toHaveBeenCalledTimes(1);
    });

    it('deve chamar gerarGrafico após processar os dados', () => {
      component.pegarQuantidadePorMes();

      expect(component.gerarGrafico).toHaveBeenCalledTimes(1);
    });

    it('deve processar dados vazios corretamente', () => {
      ofServiceMock.verificarQuantidadePorMes.and.returnValue(of([]));

      component.pegarQuantidadePorMes();

      expect(component.meses).toEqual([]);
      expect(component.quantidade).toEqual([]);
      expect(component.converterParaMesEscrito).toHaveBeenCalledTimes(1);
      expect(component.gerarGrafico).toHaveBeenCalledTimes(1);
    });

    it('deve processar dados com formato diferente corretamente', () => {
      const dadosAlternativos = [
        { mes: 6, quantidade: 30 },
        { mes: 7, quantidade: 25 }
      ];
      ofServiceMock.verificarQuantidadePorMes.and.returnValue(of(dadosAlternativos));

      component.pegarQuantidadePorMes();

      expect(component.meses).toEqual([6, 7]);
      expect(component.quantidade).toEqual([30, 25]);
    });

    it('deve chamar os métodos na sequência correta', () => {
      const callSequence: string[] = [];

      component.converterParaMesEscrito = jasmine.createSpy('converterParaMesEscrito').and.callFake(() => {
        callSequence.push('converterParaMesEscrito');
      });

      component.gerarGrafico = jasmine.createSpy('gerarGrafico').and.callFake(() => {
        callSequence.push('gerarGrafico');
      });

      component.pegarQuantidadePorMes();

      expect(callSequence).toEqual(['converterParaMesEscrito', 'gerarGrafico']);
    });
  });

describe('gerarGrafico', () => {
  let mockChartInstance: any;
  let mockCanvasElement: any;
  let originalChart: any;
  let chartSpy: jasmine.Spy;
  
  beforeEach(() => {
    (component.gerarGrafico as jasmine.Spy).and.callThrough();
    
    originalChart = (window as any).Chart;
    
    mockCanvasElement = document.createElement('canvas');
    mockCanvasElement.id = 'chart-bars';
    document.body.appendChild(mockCanvasElement);
    
    mockChartInstance = jasmine.createSpyObj('Chart', ['update', 'destroy']);
    
    chartSpy = jasmine.createSpy('Chart').and.returnValue(mockChartInstance);
    (window as any).Chart = chartSpy;
    
    component.mesesPorEscrito = ['Janeiro', 'Fevereiro', 'Março'];
    component.quantidade = [10, 15, 20];
  });
  
  afterEach(() => {
    if (document.getElementById('chart-bars')) {
      document.body.removeChild(document.getElementById('chart-bars')!);
    }
    
    (window as any).Chart = originalChart;
  });
  
  it('deve criar uma instância de Chart com as configurações corretas', () => {
    component.gerarGrafico();
    
    expect(chartSpy).toHaveBeenCalled();
    
    const chartArgs = chartSpy.calls.mostRecent().args;
    expect(chartArgs[0]).toBe(mockCanvasElement);
    
    const config = chartArgs[1];
    expect(config.type).toBe('bar');
    expect(config.data.labels).toEqual(component.mesesPorEscrito);
    expect(config.data.datasets[0].data).toEqual(component.quantidade);
    expect(config.data.datasets[0].backgroundColor).toBe('#A642F4');
  });
  
  it('deve configurar as opções do gráfico corretamente', () => {
    component.gerarGrafico();
    
    const config = chartSpy.calls.mostRecent().args[1];
    
    expect(config.options.responsive).toBeTrue();
    expect(config.options.maintainAspectRatio).toBeFalse();
    
    expect(config.options.scales.x.grid.display).toBeFalse();
    expect(config.options.scales.x.ticks.font.size).toBe(15);
    expect(config.options.scales.x.ticks.font.weight).toBe('bold');
    expect(config.options.scales.y.border.display).toBeFalse();
    
    expect(config.options.plugins.legend.display).toBeFalse();
    expect(config.options.plugins.title.display).toBeTrue();
    expect(config.options.plugins.title.text).toBe('Quantidade Mensal');
    expect(config.options.plugins.title.font.size).toBe(20);
    expect(config.options.plugins.datalabels.display).toBeFalse();
  });
  
  it('deve atribuir a instância do Chart à propriedade chartBar', () => {
    component.gerarGrafico();
    
    expect(component.chartBar).toBe(mockChartInstance);
  });
  
  it('deve lidar corretamente com dados vazios', () => {
    component.mesesPorEscrito = [];
    component.quantidade = [];
    
    component.gerarGrafico();
    
    const config = chartSpy.calls.mostRecent().args[1];
    expect(config.data.labels).toEqual([]);
    expect(config.data.datasets[0].data).toEqual([]);
  });
  
  it('deve lançar erro quando o elemento DOM não existir', () => {
    document.body.removeChild(document.getElementById('chart-bars')!);
    
    spyOn(document, 'getElementById').and.returnValue(null);
    
    expect(() => {
      component.gerarGrafico();
    }).toThrow();  
  });
});
  
  });
