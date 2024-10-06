import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoCompraService {
  private apiUrl = 'http://localhost:8080/pedido';
  constructor(private http: HttpClient) { }

  getAllPedidos(): Observable<HttpResponse<any>>{
    return this.http.get(this.apiUrl, {observe: 'response'});
  }

  getPedidoDetail(pedidoId: number):Observable<HttpResponse<any>>{
    return this.http.get(`${this.apiUrl}/detalhes?id=${pedidoId}`, {observe: 'response'});
  }

  changeStatus(pedidoId: number, codigo: string):Observable<HttpResponse<any>>{
    return this.http.put(`${this.apiUrl}/alterar-status?pedidoId=${pedidoId}&codigo=${codigo}`,null,{observe: 'response'});
  }

}
