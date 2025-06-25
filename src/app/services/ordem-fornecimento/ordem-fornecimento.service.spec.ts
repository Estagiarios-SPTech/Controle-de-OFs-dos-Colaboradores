import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdemFornecimentoService } from '../ordem-fornecimento.service';
import { OrdemFornecimento } from '../../model/ordemFornecimento';
import { OrdemFornecimentoMes } from '../../model/ordemFornecimentoMes';
import { Employee } from '../../model/Employee';

describe('OrdemFornecimentoService', () => {
  let service: OrdemFornecimentoService;
  let httpMock: HttpTestingController;

  const mockUserDev = {
    id: 101,
    name: 'João',
    email: 'joao@stefanini.com',
    role: 'Colaborador'
  };

  const mockUserRT = {
    id: 102,
    name: 'Pedro',
    email: 'pedro@stefanini.com',
    role: 'RT'
  };

  const mockUserManager = {
    id: 103,
    name: 'Maria',
    email: 'maria@stefanini.com',
    role: 'Manager'
  };

  const mockUserDev2 = {
    id: 104,
    name: 'Ana',
    email: 'ana@stefanini.com',
    role: 'Colaborador'
  };

  const mockEmployee1: Employee = {
    id: 1,
    employee: mockUserDev,
    rt: mockUserRT,
    manager: mockUserManager,
    status: 'Disponivel'
  };

  const mockEmployee2: Employee = {
    id: 2,
    employee: mockUserDev2,
    rt: mockUserRT,
    manager: mockUserManager,
    status: 'Disponivel'
  };

  const mockOrdemFornecimentos: OrdemFornecimento[] = [
    {
      codigo: 1,
      collaborator: mockEmployee1,
      description: 'Ordem de serviço mensal - Janeiro',
      status: 'Pendente de Cadastramento',
      created_at: '2023-01-15T10:00:00',
      updated_at: '2023-01-15T10:00:00'
    },
    {
      codigo: 2,
      collaborator: mockEmployee1,
      description: 'Ordem de serviço mensal - Fevereiro',
      status: 'Iniciada',
      created_at: '2023-02-10T09:30:00',
      updated_at: '2023-02-15T14:20:00'
    },
    {
      codigo: 3,
      collaborator: mockEmployee2,
      description: 'Ordem de serviço mensal - Janeiro',
      status: 'Validada',
      created_at: '2023-01-05T08:45:00',
      updated_at: '2023-01-20T16:30:00'
    }
  ];

  const mockOrdemFornecimentoMes: OrdemFornecimentoMes[] = [
    { mes: 1, quantidade: 2 },
    { mes: 2, quantidade: 1 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdemFornecimentoService]
    });

    service = TestBed.inject(OrdemFornecimentoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('verificarQuantidadePorMes()', () => {
    it('deve retornar a qtd de ofs do mes', () => {
      service.verificarQuantidadePorMes().subscribe((response) => {
        expect(response).toEqual(mockOrdemFornecimentoMes);
      });

      const req = httpMock.expectOne('http://localhost:8080/ordemFornecimento/quantidadePorMes');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrdemFornecimentoMes);
    });
  });

  describe('vericarLista()', () => {
    it('deve retornar uma lista de ordens de fornecimento', () => {
      service.vericarLista().subscribe((response) => {
        expect(response).toEqual(mockOrdemFornecimentos);
      });

      const req = httpMock.expectOne('http://localhost:8080/ordemFornecimento/listar');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrdemFornecimentos);
    });
  });

  describe('verificarListaId()', () => {
    it('deve retornar uma ordem de fornecimento pelo código', () => {
      const codigo = 1;
      const expectedOrdem = mockOrdemFornecimentos[0];

      service.verificarListaId(codigo).subscribe((response) => {
        expect(response).toEqual(expectedOrdem);
      });

      const req = httpMock.expectOne(`http://localhost:8080/ordemFornecimento/listar/${codigo}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedOrdem);
    });
  });

  describe('verificarQuantidadePorStatus()', () => {
    it('deve retornar a quantidade de ordens de fornecimento por status', () => {
      const status = 'Pendente de Cadastramento';
      const expectedCount = 1;

      service.verificarQuantidadePorStatus(status).subscribe((response) => {
        expect(response).toEqual(expectedCount);
      });

      const req = httpMock.expectOne(`http://localhost:8080/ordemFornecimento/contarPorStatus/${status}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCount);
    });
  });

  describe('verificarCadastro()', () => {
    it('deve cadastrar uma nova ordem de fornecimento', () => {
      const newOrdem: OrdemFornecimento = {
        codigo: 4,
        collaborator: mockEmployee1,
        description: 'Ordem de serviço mensal - Março',
        status: 'Pendente de Cadastramento',
        created_at: '2023-03-01T10:00:00',
        updated_at: '2023-03-01T10:00:00'
      };

      service.verificarCadastro(newOrdem).subscribe((response) => {
        expect(response).toEqual(newOrdem);
      });

      const req = httpMock.expectOne('http://localhost:8080/ordemFornecimento/criar');
      expect(req.request.method).toBe('POST');
      req.flush(newOrdem);
    });
  });

  describe('verificarAlteracao()', () => {
    it('deve alterar uma ordem de fornecimento existente', () => {
      const updatedOrdem: OrdemFornecimento = {
        codigo: 1,
        collaborator: mockEmployee1,
        description: 'Ordem de serviço mensal - Janeiro (Atualizada)',
        status: 'Atualizada',
        created_at: '2023-01-15T10:00:00',
        updated_at: '2023-03-01T10:00:00'
      };

      service.verificarAlteracao(updatedOrdem).subscribe((response) => {
        expect(response).toEqual(updatedOrdem);
      });

      const req = httpMock.expectOne('http://localhost:8080/ordemFornecimento/alterar');
      expect(req.request.method).toBe('PUT');
      req.flush(updatedOrdem);
    });
  });

  describe('verificarExclusao()', () => {
    it('deve excluir uma ordem de fornecimento pelo código', () => {
      const codigo = 1;

      service.verificarExclusao(codigo).subscribe((response) => {
        expect(response).toBeNull(); 
      });

      const req = httpMock.expectOne(`http://localhost:8080/ordemFornecimento/deletar/${codigo}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});