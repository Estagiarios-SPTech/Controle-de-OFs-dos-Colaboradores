import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioCadastradoComponent } from './modal-usuario-cadastrado.component';

describe('ModalUsuarioCadastradoComponent', () => {
  let component: ModalUsuarioCadastradoComponent;
  let fixture: ComponentFixture<ModalUsuarioCadastradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUsuarioCadastradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUsuarioCadastradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
