import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itensDevolver } from 'src/app/models/itensDevolvidos';
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
  loadingTroca = false;
  error = false;
  errorStatus = false;
  success = false;
  successTroca = false;

  isModalOpen = false;
  itensDevolver: itensDevolver[]|any = [];
  
  constructor(
    private pedidoTrocaService: PedidoTrocaService,
    private location :Location,
    private activedRoute: ActivatedRoute
  ){}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.pedidoId = Number(this.activedRoute.snapshot.paramMap.get("id"));
    this.pedidoTrocaService.getTrocaDetail(this.pedidoId).subscribe(
      (data) => {
        console.log(data);
        this.pedidoTrocaDetail = data.body;
        this.itensDevolver = this.pedidoTrocaDetail.itens.map((item:itensDevolver) => ({produtoId: item.produtoId, quantidade: 0 }));
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

  getItemUnit(id: any){
    const itemDevolver = this.itensDevolver.find(((item:itensDevolver) => item.produtoId === id));
    return itemDevolver.quantidade;
  }
  addItemUnit(id: any){
    this.itensDevolver.forEach((item:any) => {
        if(item.produtoId === id) item.quantidade++;
    });
  }

  removeItemUnit(id: any){
    this.itensDevolver.forEach((item:any) => {
      if(item.produtoId === id) item.quantidade--;
    })
  }

  finalizarTroca(){
    this.loadingTroca = true;
    this.pedidoTrocaService.finalizarTroca(this.pedidoId, this.itensDevolver.filter((item: itensDevolver) => item.quantidade !== 0)).subscribe(
      (data) => {
        console.log(data);
        this.loadingTroca = false;
        this.successTroca = true;
      },
      (err) => {
        console.log(err);
        this.loadingTroca = false;
        this.error = true;
      }
    )
  }

  confirmSuccess(){
    this.successTroca = false;
    this.closeModal();
    window.location.reload();
  }
}
