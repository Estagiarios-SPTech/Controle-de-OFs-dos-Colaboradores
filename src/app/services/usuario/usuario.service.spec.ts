import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { User } from '../../model/user';
import { of } from 'rxjs';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'Fulano', email: 'fulano@email.com', role: 'Colaborador', password: '123' },
    { id: 2, name: 'Rafael', email: 'rafael@email.com', role: 'Manager', password: '123' },
    { id: 3, name: 'Ezequiel', email: 'ezequiel@email.com', role: 'RT', password: '123' }
  ];

  const mockManagers: User[] = [
    { id: 2, name: 'Rafael', email: 'rafael@email.com', role: 'Manager', password: '123' }
  ];

  const mockRTs: User[] = [
    { id: 3, name: 'Ezequiel', email: 'ezequiel@email.com', role: 'RT', password: '123' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('select()', () => {
    it('deve retornar lista de usuários via GET', () => {

      service.select().subscribe(users => {
        expect(users.length).toBe(3);
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne('http://localhost:8080/users/findAll');

      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('select()', () => {

    it('deve retornar lista de managers via GET', () => {
      service.selectManager().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(mockManagers);
      });
      const req = httpMock.expectOne('http://localhost:8080/users/Managers');

      expect(req.request.method).toBe('GET');
      req.flush(mockManagers);
    })
  })

  describe('select()', () => {
    it('deve retornar lista de rts via GET', () => {
      service.selectRt().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(mockRTs);
      });

      const req = httpMock.expectOne('http://localhost:8080/users/RTs');

      expect(req.request.body.method).toBe('GET');
      req.flush(mockRTs);
    })
  })

  describe('signUp', () => {
    it('deve cadastrar um novo user via POST', () => {
      const newUser: User = {
        id: 101,
        name: 'fulano',
        email: 'fulano@email.com',
        role: 'Colaborador',
        password: '123'
      };

      service.signUp(newUser).subscribe(user => {
        expect(user).toBeTruthy();
        expect(user.id).toBe(101);
        expect(user.name).toBe('fulano');

        const req = httpMock.expectOne('http://localhost:8080/users/new');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newUser)

      const createdUser = { ...newUser, id: 101 };
      req.flush(createdUser);
      })
    })
  })

  describe('listarNomes()', () => {
    it('deve carregar nomes e atualizar a propriedade colaboradores', () => {
      spyOn(service, 'listarColaboradores').and.returnValue(of(mockUsers));
      
      service.listarColaboradores();
      
      expect(service.listarColaboradores).toHaveBeenCalled();
      
      const req = httpMock.expectOne('http://localhost:8080/users/Colaboradores');
      req.flush(mockUsers);
      
      // expect(service.listarColaboradores).toHaveBeenCalledWith();
    });
  });

  describe('tratamento de erros', () => {
    it('deve lidar com erro na requisição select()', () => {
      service.select().subscribe(
        () => fail('deveria ter falhado com um erro 404'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne('http://localhost:8080/users/findAll');
      req.flush('Não encontrado', { status: 404, statusText: 'Not Found' });
    });
  });


  describe('loadUsers()', () => {
    it('deve carregar usuários e atualizar a propriedade usuarios', () => {
      spyOn(service, 'select').and.callThrough();
      
      service.loadUsers();
      
      expect(service.select).toHaveBeenCalled();
      
      const req = httpMock.expectOne('http://localhost:8080/users/findAll');
      req.flush(mockUsers);
      
      expect(service.usuarios).toEqual(mockUsers);
    });
  });
  
});

