import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-dados-usuario',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    CommonModule],
  templateUrl: './form-dados-usuario.component.html',
  styleUrl: './form-dados-usuario.component.css'
})
export class FormDadosUsuarioComponent {
  naoPodeEditar:boolean = true

  permitirEdicao(){
      this.naoPodeEditar = false
  }
  
  naoPermitirEdicao(){
      this.naoPodeEditar = true
  }
}
