import { Component } from '@angular/core';
import { CadastrarUsuarioComponent } from '../../componentes/cadastrar-usuario/cadastrar-usuario.component';
import { ColaboradoresComponent } from "../../componentes/colaboradores/colaboradores.component";

@Component({
  selector: 'app-usuarios',
  imports: [CadastrarUsuarioComponent, ColaboradoresComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
