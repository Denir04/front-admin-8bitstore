import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosTrocaComponent } from './pedidos-troca.component';

describe('PedidosTrocaComponent', () => {
  let component: PedidosTrocaComponent;
  let fixture: ComponentFixture<PedidosTrocaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosTrocaComponent]
    });
    fixture = TestBed.createComponent(PedidosTrocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
