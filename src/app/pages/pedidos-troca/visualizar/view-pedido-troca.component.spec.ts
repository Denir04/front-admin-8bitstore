import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPedidoTrocaComponent } from './view-pedido-troca.component';

describe('ViewPedidoTrocaComponent', () => {
  let component: ViewPedidoTrocaComponent;
  let fixture: ComponentFixture<ViewPedidoTrocaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPedidoTrocaComponent]
    });
    fixture = TestBed.createComponent(ViewPedidoTrocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
