import { Routes } from '@angular/router';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { OrdemFornecimentoComponent } from './paginas/ordem-fornecimento/ordem-fornecimento.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { PaginaPrincipalComponent } from './paginas/pagina-principal/pagina-principal.component';
import { MeuUsuarioComponent } from './paginas/meu-usuario/meu-usuario.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'paginaPrincipal', component: PaginaPrincipalComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'usuario', component: UsuariosComponent},
            {path: 'ordemFornecimento', component: OrdemFornecimentoComponent},
            {path: 'meuUsuario', component: MeuUsuarioComponent}
        ]
    }
];
