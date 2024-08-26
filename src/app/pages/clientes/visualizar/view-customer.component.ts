import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private customerService: CustomerService,
    private location :Location 
  ){}

  ngOnInit(): void {
    this.customerService.getOneCustomer("1").subscribe((response) => {
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

}
