import { Routes } from '@angular/router';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { OrdemFornecimentoComponent } from './paginas/ordem-fornecimento/ordem-fornecimento.component';

export const routes: Routes = [
    {path: '', component: UsuariosComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'ordemServico', component: OrdemFornecimentoComponent}
];
