import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [AuthService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Controle-de-OFs-dos-Colaboradores' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Controle-de-OFs-dos-Colaboradores');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('title')?.textContent).toContain('Controle-de-OFs-dos-Colaboradores');
  });

  it('Deve receber o token e acessar "/paginaPrincipal/home"', () => {
    localStorage.setItem('token', 'valorToken')
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate')

    app.ngOnInit()

    expect(router.navigate).toHaveBeenCalledWith(['/paginaPrincipal/home']);
  })

  it('Deve não receber o token e acessar "/"', () => {
    localStorage.setItem('token', '')
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate')

    app.ngOnInit()

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  })
});
