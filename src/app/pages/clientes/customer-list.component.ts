import { customPatterns, customPatternsEmail } from '../../core/pattern';
import { CustomerService } from '../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customersList: Customer[] = [];
  customerForm: FormGroup = new FormGroup({});
  loading = true;
  error = false;
  customPatterns = customPatterns;
  customPatternsEmail = customPatternsEmail;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      clienteId: [''],
      nomeCompleto: [''],
      email: [''],
      dataNascimentoMin: [''],
      dataNascimentoMax: [''],
      cpf: [''],
      telefone: [''],
      generoMasc: [false],
      generoFem: [false],
      generoOther: [false],
      statusAtivo: [false],
      statusInativo: [false]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe(
      (response) => {
        console.log(response);
        this.customersList = response.body.content;
        this.loading = false;
      },
      () => {
        this.error = true;
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }

  onSubmit() {
    const queryParams = this.toQueryParams(this.customerForm.value);
    this.loading = true;
    this.customerService.getAllCustomersQuery(queryParams).subscribe(
      (response) => {
        console.log(response);
        this.customersList = response.body;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.error = true;
        this.loading = false;
      }
    );
  }

  onClear() {
    this.customerForm.reset();
    this.ngOnInit();
  }

  goToViewCustomer(id: number){
    this.router.navigate([`/clientes/visualizar/${id}`])
  }

  toQueryParams(formValue: any): string {
    return Object.keys(formValue)
      .filter((key) => !!formValue[key])
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(formValue[key])
      )
      .join('&');
  }
}
