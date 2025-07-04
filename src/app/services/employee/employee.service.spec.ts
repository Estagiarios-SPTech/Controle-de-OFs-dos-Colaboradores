import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../../model/employee';
import { Observable, Observer } from 'rxjs';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const mockUser = {
    id: 101,
    name: 'Fabio',
    email: 'fabio@stefanini.com',
    role: 'Colaborador',
    password: '123'
  };

  const mockRT = {
    id: 102,
    name: 'Ezequiel',
    email: 'ezequiel@stefanini.com',
    role: 'RT',
    password: '123'
  };

  const mockManager = {
    id: 103,
    name: 'Rafael',
    email: 'rafael@stefanini.com',
    role: 'Manager',
    password: '123'
  };

  const mockEmployees: Employee[] = [
    {
      id: 1,
      user: mockUser,
      rt: mockRT,
      manager: mockManager,
      status: 'Disponivel'
    },
    {
      id: 2,
      user: {
        id: 104,
        name: 'Shirley',
        email: 'shirley@stefanini.com',
        role: 'Colaborador',
        password: '123'
      },
      rt: mockRT,
      manager: mockManager,
      status: 'Alocado'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('select()', () => {
    it('deve retornar uma lista de funcionários via GET', () => {
      service.select().subscribe(employees => {
        expect(employees).toEqual(mockEmployees);
        expect(employees.length).toBe(2);
      });

      const req = httpMock.expectOne('http://localhost:8080/employees/findAll');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });

    it('deve lidar com uma resposta vazia', () => {
      service.select().subscribe(employees => {
        expect(employees).toEqual([]);
        expect(employees.length).toBe(0);
      });

      const req = httpMock.expectOne('http://localhost:8080/employees/findAll');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('loadEmployees()', () => {
    it('deve carregar funcionários e atualizar a propriedade employees', () => {
      spyOn(service, 'select').and.returnValue(new Observable(observer => {
        observer.next(mockEmployees);
        observer.complete();
      }));

      service.loadEmployees();
      
      expect(service.select).toHaveBeenCalled();
      
      expect(service.employees).toEqual(mockEmployees);
    });
  });

  describe('cadastrarEmployee()', () => {
    it('deve cadastrar um novo funcionário via POST', () => {
      const newEmployee: Employee = {
        id: 3,
        user: {
          id: 105,
          name: 'João',
          email: 'joão@stefanini.com',
          role: 'Colaborador',
          password: '123'
        },
        rt: mockRT,
        manager: mockManager,
        status: 'Disponivel'
      };

      service.cadastrarEmployee(newEmployee).subscribe(response => {
        expect(response).toEqual(newEmployee);
      });

      const req = httpMock.expectOne('http://localhost:8080/employees/new');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEmployee);
      req.flush(newEmployee);
    });

    it('deve lidar com erro ao cadastrar funcionário', () => {
      const newEmployee: Employee = {
        id: 3,
        user: {
          id: 105,
          name: 'Joao',
          email: 'joao@stefanini.com',
          role: 'Colaborador',
          password: '123'
        },
        rt: mockRT,
        manager: mockManager,
        status: 'Disponivel'
      };

      const errorResponse = { status: 400, statusText: 'Bad Request' };
      const errorMessage = 'Erro ao cadastrar funcionário';

      service.cadastrarEmployee(newEmployee).subscribe(
        () => fail('deveria ter falhado com um erro'),
        (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        }
      );

      const req = httpMock.expectOne('http://localhost:8080/employees/new');
      expect(req.request.method).toBe('POST');
      req.flush(errorMessage, errorResponse);
    });
  });

  describe('URL base', () => {
    it('deve usar a URL base correta para todas as requisições', () => {
      service.select().subscribe();
      let req = httpMock.expectOne('http://localhost:8080/employees/findAll');
      req.flush([]);

      const newEmployee: Employee = { 
        id: 1, 
        user: mockUser, 
        rt: mockRT, 
        manager: mockManager, 
        status: 'Disponivel'
      };
      service.cadastrarEmployee(newEmployee).subscribe();
      req = httpMock.expectOne('http://localhost:8080/employees/new');
      req.flush(newEmployee);
    });
  });
});