import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly url = 'http://localhost:8081/user/login';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private jwtHelper = inject(JwtHelperService);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.currentUserSubject.next(decodedToken);
    }
  }
  
  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  getId(): number | null {
    return this.getDecodedToken()?.id;
  }

  getEmail(): string | null {
    return this.getDecodedToken()?.email;
  }

  getNome(): string | null {
    return this.getDecodedToken()?.name;
  }

  getRole(): string | null {
    return this.getDecodedToken()?.role;
  }

  getPassword(): string | null {
    return this.getDecodedToken()?.password;
  }

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post(this.url, credentials, {
      responseType: 'text'
    }).pipe(
      tap((token: string) => {
        localStorage.setItem('token', token);

        const decodedToken = this.jwtHelper.decodeToken(token);
        this.currentUserSubject.next(decodedToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = ''
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

}