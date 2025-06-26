import { NgStyle, CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgStyle,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  coluna = 2
  rowspan = 1
  width: number;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.width = window.innerWidth
    this.alterarColuna()

  }

  @HostListener('window:resize')
  alterarColuna() {
    this.width = window.innerWidth
    if (this.width < 900) {
      this.coluna = 1
      this.rowspan = 4
    }
    else {
      this.coluna = 2
      this.rowspan = 1
    }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
  ]);

  validateForm() {
    this.emailFormControl.markAsTouched();
    this.passwordFormControl.markAsTouched();
  }

  matcher = new MyErrorStateMatcher();

  login() {
    console.log('chamou a função de login')

    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      this.validateForm();
      return; 
    }

    const credentials = {
      email: this.emailFormControl.value ?? '',
      password: this.passwordFormControl.value ?? '',
    };

    this.authService.login(credentials).subscribe(
      response => {
        console.log('Login bem-sucedido', response);
        this.router.navigate(['/paginaPrincipal/home']); 
      },
      error => {
        console.error('Erro ao fazer login', error);
        this.errorMessage = 'Email ou senha incorretos'; 
      }
    );
  }
}
