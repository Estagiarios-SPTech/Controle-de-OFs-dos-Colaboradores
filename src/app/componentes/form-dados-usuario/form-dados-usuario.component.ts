import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-form-dados-usuario',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    CommonModule, ReactiveFormsModule],
  templateUrl: './form-dados-usuario.component.html',
  styleUrl: './form-dados-usuario.component.css'
})
export class FormDadosUsuarioComponent {
  naoPodeEditar:boolean = true
  mostrarSenha:boolean = false

  constructor(private auth: AuthService, private userService: UsuarioService){}

  ngOnInit(){
    this.recuperarDados()
  }

  permitirEdicao(){
    this.mostrarSenha = true
    this.naoPodeEditar = false
  }
  
  naoPermitirEdicao(){
    this.mostrarSenha = false
    this.naoPodeEditar = true
    window.location.reload()
  }

  fb = inject(FormBuilder)
  usuarioAtual = this.fb.group(
    {
      id: 0,
      name: ['', Validators.required],
      role: '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]]
    }
  )

  credenciais = {
    email: '',
    password: ''
  }

  recuperarDados(){
    this.usuarioAtual.get('id')?.setValue(this.auth.getId())
    this.usuarioAtual.get('name')?.setValue(this.auth.getNome())
    this.usuarioAtual.get('role')?.setValue(this.auth.getRole())
    this.usuarioAtual.get('email')?.setValue(this.auth.getEmail())
    this.usuarioAtual.get('password')?.setValue(this.auth.getPassword())
  }

  atualizarDados(){
    if(this.usuarioAtual.valid){
      this.userService.alterarDados(this.usuarioAtual.value as User).subscribe(
        retorno => {
          this.credenciais.email = this.usuarioAtual.value.email as string
          this.credenciais.password = this.usuarioAtual.value.password as string
          this.auth.login(this.credenciais).subscribe(
              retorno => window.location.reload()
          )
        }
      )
    }
  }
}
