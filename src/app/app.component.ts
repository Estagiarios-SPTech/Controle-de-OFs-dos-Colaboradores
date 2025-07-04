import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Controle-de-OFs-dos-Colaboradores';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/paginaPrincipal/home']);
    } else {
      this.router.navigate(["/"])
    }
  }
}
