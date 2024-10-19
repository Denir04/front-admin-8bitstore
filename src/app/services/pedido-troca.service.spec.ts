import { TestBed } from '@angular/core/testing';

import { PedidoTrocaService } from './pedido-troca.service';

describe('PedidoTrocaService', () => {
  let service: PedidoTrocaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoTrocaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
