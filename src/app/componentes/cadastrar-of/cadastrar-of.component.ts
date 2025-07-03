import { Component, EventEmitter, inject, Output, ViewChild} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { OrdemFornecimentoService } from '../../services/ordem-fornecimento/ordem-fornecimento.service';
import { OrdemFornecimento } from '../../model/ordemFornecimento';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-cadastrar-of',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './cadastrar-of.component.html',
  styleUrl: './cadastrar-of.component.css'
})
export class CadastrarOFComponent {
  status = ["Pendente de Cadastramento", "Iniciada", "Validada"]
  colaboradores: User[] = [] 

  ofService = inject(OrdemFornecimentoService)
  private usuarioService = inject(UsuarioService)
  @Output() realizouCadastro = new EventEmitter<void>(); 
  ordemFornecimento = new OrdemFornecimento()

  ngOnInit(){
    this.usuarioService.listarColaboradores().subscribe(
      retorno => this.colaboradores = retorno)
  }

  cadastrar(){
    console.log(this.ordemFornecimento)
    this.ofService.verificarCadastro(this.ordemFornecimento)
    .subscribe(() => this.realizouCadastro.emit())
  }
}
