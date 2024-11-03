import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './pages/clientes/customer-list.component';
import { ViewCustomerComponent } from './pages/clientes/visualizar/view-customer.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PedidosCompraComponent } from './pages/pedidos-compra/pedidos-compra.component';
import { ViewPedidoCompraComponent } from './pages/pedidos-compra/visualizar/view-pedido-compra.component';
import { PedidosTrocaComponent } from './pages/pedidos-troca/pedidos-troca.component';
import { ViewPedidoTrocaComponent } from './pages/pedidos-troca/visualizar/view-pedido-troca.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { HistoricoVendasComponent } from './pages/produtos/historico-vendas/historico-vendas.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, CustomerListComponent, ViewCustomerComponent, PedidosCompraComponent, ViewPedidoCompraComponent, PedidosTrocaComponent, ViewPedidoTrocaComponent, ProdutosComponent, HistoricoVendasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    provideNgxMask({
      /* opções de cfg */
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
