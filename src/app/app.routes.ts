import { Routes } from '@angular/router';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { OrdemFornecimentoComponent } from './paginas/ordem-fornecimento/ordem-fornecimento.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'ordemServico', component: OrdemFornecimentoComponent}
];
