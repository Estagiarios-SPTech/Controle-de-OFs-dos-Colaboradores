import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuUsuarioComponent } from './meu-usuario.component';

describe('MeuUsuarioComponent', () => {
  let component: MeuUsuarioComponent;
  let fixture: ComponentFixture<MeuUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
