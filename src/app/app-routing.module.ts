import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/clientes/customer-list.component';
import { ViewCustomerComponent } from './pages/clientes/visualizar/view-customer.component';
import { PedidosCompraComponent } from './pages/pedidos-compra/pedidos-compra.component';
import { ViewPedidoCompraComponent } from './pages/pedidos-compra/visualizar/view-pedido-compra.component';
import { PedidosTrocaComponent } from './pages/pedidos-troca/pedidos-troca.component';
import { ViewPedidoTrocaComponent } from './pages/pedidos-troca/visualizar/view-pedido-troca.component';

const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: CustomerListComponent },
  { path: 'clientes/visualizar/:id', component: ViewCustomerComponent },
  { path: 'pedidos-compra', component: PedidosCompraComponent},
  { path: 'pedidos-compra/visualizar/:id', component: ViewPedidoCompraComponent},
  { path: 'pedidos-troca', component: PedidosTrocaComponent},
  { path: 'pedidos-troca/visualizar/:id', component: ViewPedidoTrocaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
