import { Component, Input } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-of',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-of.component.html',
  styleUrl: './cadastrar-of.component.css'
})
export class CadastrarOFComponent {
  status = ["Pendente de Cadastramento", "Iniciada", "Validada"]
  @Input() mostrarBotao: boolean = true

  ordemFornecimento = new FormGroup({
    colaborador: new FormControl(""),
    status: new FormControl(""),
    descricao: new FormControl("")
  })

  // id = 3;
  // colaborador = "";
  // descricao = "";
  // status = "Pendente de Cadastramento";
  // dataAtual: Date = new Date();
  
  // adicionarOf(){
  //   this.ordemFornecimentos.push({id: this.id,
  //                                 colaborador: this.colaborador,
  //                                 descricao: this.descricao,
  //                                 status: this.status,
  //                                 criacao: this.dataAtual.toLocaleDateString(),
  //                                 atualizacao: ""})
  //     this.id++;
  // }
}
