import { Component } from '@angular/core';
import { CadastrarUsuarioComponent } from '../../componentes/cadastrar-usuario/cadastrar-usuario.component';

@Component({
  selector: 'app-usuarios',
  imports: [CadastrarUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
