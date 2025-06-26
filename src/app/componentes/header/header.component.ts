import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  user: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getNome() || 'Erro';
    
  //  console.log('Email:', this.authService.getEmail());
  //  console.log('Nome:', this.authService.getNome());
  //  console.log('Role:', this.authService.getRole()); 
  }

}
