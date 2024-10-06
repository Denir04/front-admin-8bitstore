import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoCompraService } from 'src/app/services/pedido-compra.service';

@Component({
  selector: 'app-view-pedido-compra',
  templateUrl: './view-pedido-compra.component.html',
  styleUrls: ['./view-pedido-compra.component.css']
})
export class ViewPedidoCompraComponent implements OnInit {
  pedidoCompraDetail: any = {
    id: 0,
    nome_completo: '',
    data_nascimento: '',
    cpf: '',
    genero: '',
    email: '',
    telefone: '',
    ativo: ''
  };
  pedidoId = 0;
  loading = true;
  loadingStatus = false;
  error = false;
  errorStatus = false;
  success = false;
  
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private location :Location,
    private activedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.pedidoId = Number(this.activedRoute.snapshot.paramMap.get("id"));
    this.pedidoCompraService.getPedidoDetail(this.pedidoId).subscribe(
      (data) => {
        console.log(data);
        this.pedidoCompraDetail = data.body;
        this.loading = false;
      }, (err) => {
        console.error(err);
        this.loading = false;
      }
    )
  }

  goBack(){
    this.location.back();
  }

  madeReload(){
    window.location.reload();
  }

  changeStatus(codigo: string){
    this.loadingStatus = true;
    this.pedidoCompraService.changeStatus(this.pedidoId, codigo).subscribe(
      (data) => {
        console.log(data);
        this.success = true;
      },
      (err) => {
        console.log(err);
        this.errorStatus = true;
      }
    )
  }
}
