import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private url = "http://localhost:8080/users"
  colaboradores:User[] = []

  private urlUser:string = 'http://localhost:8080/users';
  
  
  constructor(private http:HttpClient) {}
       
   loadUsers(): void {
    this.select().subscribe(data => {
        this.usuarios = data;
    });
}

  usuarios:User[] = [];
  select():Observable<User[]>{
    return this.http.get<User[]>(this.urlUser + "/findAll");
  }

  managers:User[] = [];
  selectManager():Observable<User[]>{
    return this.http.get<User[]>(this.urlUser + "/Managers");
  }
  
  rts:User[] = [];
  selectRt():Observable<User[]>{
    return this.http.get<User[]>(this.urlUser + "/RTs");
  }

  signUp(obj:User):Observable<User>{
    return this.http.post<User>(this.urlUser + "/new", obj);
  }

}
