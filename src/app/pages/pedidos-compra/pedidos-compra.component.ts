import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { customPatterns } from 'src/app/core/pattern';
import { PedidoCompra } from 'src/app/models/pedidoCompra';
import { PedidoCompraService } from 'src/app/services/pedido-compra.service';

@Component({
  selector: 'app-pedidos-compra',
  templateUrl: './pedidos-compra.component.html',
  styleUrls: ['./pedidos-compra.component.css']
})
export class PedidosCompraComponent implements OnInit {
  pedidoCompraList: PedidoCompra[] = [];
  loading = true;
  error = false;
  customPatterns = customPatterns;


  constructor(
    private pedidoCompraService: PedidoCompraService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.pedidoCompraService.getAllPedidos().subscribe((data) => {
      console.log(data)
      this.pedidoCompraList = data.body;
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.loading = false;
    })
  }

  goToViewPedido(id: number){
    this.router.navigate([`pedidos-compra/visualizar/${id}`])
  }

}
