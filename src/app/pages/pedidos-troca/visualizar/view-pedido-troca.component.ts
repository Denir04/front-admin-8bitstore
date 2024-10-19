import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoTrocaService } from 'src/app/services/pedido-troca.service';

@Component({
  selector: 'app-view-pedido-troca',
  templateUrl: './view-pedido-troca.component.html',
  styleUrls: ['./view-pedido-troca.component.css']
})
export class ViewPedidoTrocaComponent {
  pedidoTrocaDetail: any;
  pedidoId = 0;
  loading = true;
  loadingStatus = false;
  error = false;
  errorStatus = false;
  success = false;
  
  constructor(
    private pedidoTrocaService: PedidoTrocaService,
    private location :Location,
    private activedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.pedidoId = Number(this.activedRoute.snapshot.paramMap.get("id"));
    this.pedidoTrocaService.getTrocaDetail(this.pedidoId).subscribe(
      (data) => {
        console.log(data);
        this.pedidoTrocaDetail = data.body;
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
    this.pedidoTrocaService.changeStatus(this.pedidoId, codigo).subscribe(
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
