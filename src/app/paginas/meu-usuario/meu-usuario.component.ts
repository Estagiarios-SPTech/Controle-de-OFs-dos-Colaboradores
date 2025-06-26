import { Component } from '@angular/core';
import { FormDadosUsuarioComponent } from "../../componentes/form-dados-usuario/form-dados-usuario.component";
import { ColaboradoresComponent } from "../../componentes/colaboradores/colaboradores.component";

@Component({
  selector: 'app-meu-usuario',
  imports: [FormDadosUsuarioComponent, ColaboradoresComponent],
  templateUrl: './meu-usuario.component.html',
  styleUrl: './meu-usuario.component.css'
})
export class MeuUsuarioComponent {

}
