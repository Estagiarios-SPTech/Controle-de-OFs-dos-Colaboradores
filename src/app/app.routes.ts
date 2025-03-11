import { Routes } from '@angular/router';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { OrdemFornecimentoComponent } from './modulos/ordem-fornecimento/ordem-fornecimento.component';
import { HomeComponent } from './modulos/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'ordemServico', component: OrdemFornecimentoComponent}
];
