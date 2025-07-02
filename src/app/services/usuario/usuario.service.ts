import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private urlSpringBoot = "http://localhost:8080/users"
  private urlQuarkus = "http://localhost:8081/user"
  colaboradores:User[] = []
  
  constructor(private http:HttpClient,  private jwtHelper: JwtHelperService) {}
       
  verificarEmailExistente(email: string):Observable<boolean>{
    return this.http.get<boolean>(this.urlQuarkus + "/verificarEmail/" + email);
  }

  loadUsers(): void {
    this.select().subscribe(data => {
      this.usuarios = data;
    });
  }

  verificarUsuario():Observable<User[]>{
    return this.http.get<User[]>(this.urlSpringBoot + "/listarNomes");
  }

  listarNomes(): void {
    this.verificarUsuario()
      .subscribe(retorno => this.colaboradores = retorno);
  }
  
  usuarios:User[] = [];
  select():Observable<User[]>{
    return this.http.get<User[]>(this.urlSpringBoot + "/findAll");
  }

  managers:User[] = [];
  selectManager():Observable<User[]>{
    return this.http.get<User[]>(this.urlSpringBoot + "/Managers");
  }
  
  rts:User[] = [];
  selectRt():Observable<User[]>{
    return this.http.get<User[]>(this.urlSpringBoot + "/RTs");
  }

  signUp(obj:User):Observable<User>{
    return this.http.post<User>(this.urlQuarkus + "/cadastrar", obj);
  }

  authUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.urlQuarkus}/login`, credentials);
  }


}
