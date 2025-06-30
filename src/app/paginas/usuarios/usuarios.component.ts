import { Component } from '@angular/core';
import { CadastrarUsuarioComponent } from '../../componentes/cadastrar-usuario/cadastrar-usuario.component';
import { ColaboradoresComponent } from "../../componentes/colaboradores/colaboradores.component";
import { ConsultarUsuarioComponent } from "../../componentes/consultar-usuario/consultar-usuario.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-usuarios',
  imports: [CadastrarUsuarioComponent, ColaboradoresComponent,
    ConsultarUsuarioComponent, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  constructor(public auth:AuthService){}
}
