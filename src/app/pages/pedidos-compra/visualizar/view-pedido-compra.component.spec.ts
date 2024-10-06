import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPedidoCompraComponent } from './view-pedido-compra.component';

describe('ViewPedidoCompraComponent', () => {
  let component: ViewPedidoCompraComponent;
  let fixture: ComponentFixture<ViewPedidoCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPedidoCompraComponent]
    });
    fixture = TestBed.createComponent(ViewPedidoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
