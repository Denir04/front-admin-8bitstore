import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  customer: Customer = {
    id: 0,
    nome_completo: '',
    data_nascimento: '',
    cpf: '',
    genero: '',
    email: '',
    telefone: '',
    ativo: ''
  };
  loading = true;
  error = false;
  confirmAction = '';
  success = false;

  constructor(
    private customerService: CustomerService,
    private location :Location,
    private activedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.customer.id = Number(this.activedRoute.snapshot.paramMap.get("id"));
    this.customerService.getOneCustomer(`${this.customer.id}`).subscribe((response) => {
      this.customer = response.body;
      this.loading = false;
    },() => {
      this.error = true;
      this.loading = false;
    })
  }

  goBack(){
    this.location.back();
  }

  reloadPage(){
    window.location.reload();
  }

  changeAtivo(){
    this.loading = true;
    this.customerService.changeAtivo(String(this.customer.id)).subscribe((res) => {
      this.success = true;
      this.loading = false;
      this.confirmAction = '';
    }, (error) => {
      console.log(error);
      this.error = true;
      this.loading = false;
      this.confirmAction = '';
    })
  }

}
