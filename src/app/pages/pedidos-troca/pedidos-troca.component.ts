import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { customPatterns } from 'src/app/core/pattern';
import { PedidoTroca } from 'src/app/models/pedidoTroca';
import { PedidoTrocaService } from 'src/app/services/pedido-troca.service';

@Component({
  selector: 'app-pedidos-troca',
  templateUrl: './pedidos-troca.component.html',
  styleUrls: ['./pedidos-troca.component.css']
})
export class PedidosTrocaComponent implements OnInit {
  pedidoTrocaList: PedidoTroca[] = [];
  loading = true;
  error = false;
  customPatterns = customPatterns;

  constructor(
    private pedidoTrocaService: PedidoTrocaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.pedidoTrocaService.getAllTrocas().subscribe((data) => {
      console.log(data)
      this.pedidoTrocaList = data.body;
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.loading = false;
    })
  }

  goToViewPedido(id: number){
    this.router.navigate([`pedidos-troca/visualizar/${id}`])
  }

}
