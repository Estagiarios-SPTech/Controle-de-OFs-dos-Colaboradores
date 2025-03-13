import { Routes } from '@angular/router';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { OrdemFornecimentoComponent } from './paginas/ordem-fornecimento/ordem-fornecimento.component';
import { HomeComponent } from './paginas/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'ordemServico', component: OrdemFornecimentoComponent}
];
