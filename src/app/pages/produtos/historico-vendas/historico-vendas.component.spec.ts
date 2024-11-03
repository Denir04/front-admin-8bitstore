import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoVendasComponent } from './historico-vendas.component';

describe('HistoricoVendasComponent', () => {
  let component: HistoricoVendasComponent;
  let fixture: ComponentFixture<HistoricoVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoVendasComponent]
    });
    fixture = TestBed.createComponent(HistoricoVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
