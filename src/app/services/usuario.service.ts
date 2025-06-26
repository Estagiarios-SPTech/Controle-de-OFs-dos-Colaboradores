import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private url = "http://localhost:8080/users"
  colaboradores: User[] = []

  private urlUser: string = 'http://localhost:8080/users';
  private urlMicroservice: string = 'http://localhost:8081/user';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  loadUsers(): void {
    this.select().subscribe(data => {
      this.usuarios = data;
    });
  }

  verificarUsuario(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "/listarNomes");
  }

  listarNomes(): void {
    this.verificarUsuario()
      .subscribe(retorno => this.colaboradores = retorno);
  }

  usuarios: User[] = [];
  select(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUser + "/findAll");
  }

  managers: User[] = [];
  selectManager(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUser + "/Managers");
  }

  rts: User[] = [];
  selectRt(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUser + "/RTs");
  }

  signUp(obj: User): Observable<User> {
    return this.http.post<User>(this.urlUser + "/new", obj);
  }

  authUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.urlMicroservice}/login`, credentials);
  }


}
