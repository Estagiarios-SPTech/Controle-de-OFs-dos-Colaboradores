import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemFornecimentoComponent } from './ordem-fornecimento.component';

describe('OrdemFornecimentoComponent', () => {
  let component: OrdemFornecimentoComponent;
  let fixture: ComponentFixture<OrdemFornecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdemFornecimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdemFornecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
