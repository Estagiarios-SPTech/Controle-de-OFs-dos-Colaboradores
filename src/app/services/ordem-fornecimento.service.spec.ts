import { TestBed } from '@angular/core/testing';

import { OrdemFornecimentoService } from './ordem-fornecimento.service';

describe('OrdemFornecimentoService', () => {
  let service: OrdemFornecimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdemFornecimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
