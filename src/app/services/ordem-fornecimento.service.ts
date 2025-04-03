import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdemFornecimento } from '../model/ordem-fornecimento';

@Injectable({
  providedIn: 'root'
})

export class OrdemFornecimentoService {

  private url:string = "http://localhost:8080/ordemFornecimento"

  constructor(private http:HttpClient) {}

  ordemFornecimentos: OrdemFornecimento[] = []

  vericarLista():Observable<OrdemFornecimento[]>{
    return this.http.get<OrdemFornecimento[]>(this.url + "/listar");
  }

  listar():void{
    this.vericarLista()
    .subscribe(retorno => this.ordemFornecimentos = retorno)
  }

  verificarCadastro(obj: OrdemFornecimento):Observable<OrdemFornecimento>{
    return this.http.post<OrdemFornecimento>(this.url + "/criar", obj);
  }

  cadastrar(obj:OrdemFornecimento){
    this.verificarCadastro(obj).subscribe()
    this.listar();
  }

  excluir(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + "/deletar/" + codigo);
  }
}
