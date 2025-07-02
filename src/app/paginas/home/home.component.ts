import { Component } from '@angular/core';
import { CardComponent } from '../../componentes/card/card.component';
import { ConsultarUsuarioComponent } from '../../componentes/consultar-usuario/consultar-usuario.component';
import { GraficoEmpilhadoComponent } from '../../componentes/grafico-empilhado/grafico-empilhado.component';
import { Router, RouterLink } from '@angular/router';
import { GraficoPieOfComponent } from '../../componentes/grafico-pie-of/grafico-pie-of.component';
import { CardAzulComponent } from "../../componentes/card-azul/card-azul.component";
import { GraficoBarraOfComponent } from "../../grafico-barra-of/grafico-barra-of.component";
import { AuthService } from '../../services/auth.service';
import { tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [CardComponent, ConsultarUsuarioComponent, GraficoEmpilhadoComponent, RouterLink, GraficoPieOfComponent,
    CardAzulComponent, GraficoBarraOfComponent, MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  role: string = ''

  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar) {
    this.role = authService.getRole() ?? '';
  }

  ngOnInit() {
    this.role = this.authService.getRole() ?? '';
  }

  mostrarNaoAutorizado(): void {
    this.snackBar.open('Acesso negado para gerentes', 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


  cadastrarUser() {
    if (this.role === 'Admin' || this.role === 'RT') {
      this.router.navigate(['/paginaPrincipal/usuario']);
    } else {
      this.mostrarNaoAutorizado();
    }
  }

}
