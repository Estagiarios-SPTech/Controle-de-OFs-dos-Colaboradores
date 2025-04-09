import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdemFornecimento } from '../model/ordemFornecimento';

@Injectable({
  providedIn: 'root'
})

export class OrdemFornecimentoService {

  private url:string = "http://localhost:8080/ordemFornecimento"

  constructor(private http:HttpClient) {}

  ordemFornecimentos: OrdemFornecimento[] = []
  ordemFornecimento: OrdemFornecimento = new OrdemFornecimento()

  vericarLista():Observable<OrdemFornecimento[]>{
    return this.http.get<OrdemFornecimento[]>(this.url + "/listar");
  }

  verificarListaId(codigo:number):Observable<OrdemFornecimento>{
    return this.http.get<OrdemFornecimento>(this.url + "/listar/" + codigo);
  }

  verificarCadastro(obj: OrdemFornecimento):Observable<OrdemFornecimento>{
    return this.http.post<OrdemFornecimento>(this.url + "/criar", obj);
  }

  verificarAlteracao(obj: OrdemFornecimento):Observable<OrdemFornecimento>{
    return this.http.put<OrdemFornecimento>(this.url + "/alterar", obj);
  }

  verificarExclusao(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + "/deletar/" + codigo);
  }
}
