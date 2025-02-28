import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarOFComponent } from './cadastrar-of.component';

describe('CadastrarOFComponent', () => {
  let component: CadastrarOFComponent;
  let fixture: ComponentFixture<CadastrarOFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarOFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarOFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
