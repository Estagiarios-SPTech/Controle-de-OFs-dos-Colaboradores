import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

export interface usuario{
  id: string;
  colaborador: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = "http://localhost:8080/users"
  colaboradores:User[] = []

  constructor(private http:HttpClient) { }

  verificarUsuario():Observable<User[]>{
    return this.http.get<User[]>(this.url + "/listarNomes");
  }

  listarNomes():void{
    this.verificarUsuario()
    .subscribe(retorno => this.colaboradores = retorno);
  }

  usuarios: usuario[] = [
        {
          id: '1',
          colaborador: 'Usuario01',
          status: 'Disponível',
        },
        {
          id: '2',
          colaborador: 'Usuario02',
          status: 'Aguardando Respostas',
        },
        {
          id: '3',
          colaborador: 'Usuario03',
          status: 'Finalizando',
        },
        
      ]
}
