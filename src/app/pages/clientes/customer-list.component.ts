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
      cliente_id: [''],
      nome_completo: [''],
      email: [''],
      data_nascimento_min: [''],
      data_nascimento_max: [''],
      cpf: [''],
      telefone: [''],
      generos: [[]],
      ativos: [[]]
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
        this.customersList = response.body.content;
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
    this.customerForm.reset({
      generos: [],
      ativos: []
    });
    this.ngOnInit();
  }

  goToViewCustomer(id: number){
    this.router.navigate([`/clientes/visualizar/${id}`])
  }

  onCheckboxChangeGenero(genero: string, event: any) {
    const selectedGeneros = this.customerForm.get('generos')?.value as string[];
    if (event.target.checked) {
      if (!selectedGeneros.includes(genero)) {
        selectedGeneros.push(genero);
      }
    } else {
      const index = selectedGeneros.indexOf(genero);
      if (index > -1) {
        selectedGeneros.splice(index, 1);
      }
    }
    this.customerForm.get('generos')?.setValue(selectedGeneros);
  }

  isCheckedGenero(genero: string): boolean {
    const selectedGeneros = this.customerForm.get('generos')?.value as string[];
    return selectedGeneros.includes(genero);
  }

  onCheckboxChangeAtivo(ativo: string, event: any){
    const selectedAtivos = this.customerForm.get('ativos')?.value as string[];
    if (event.target.checked) {
      if (!selectedAtivos.includes(ativo)) {
        selectedAtivos.push(ativo);
      }
    } else {
      const index = selectedAtivos.indexOf(ativo);
      if (index > -1) {
        selectedAtivos.splice(index, 1);
      }
    }
    this.customerForm.get('ativos')?.setValue(selectedAtivos);
  }

  isCheckedAtivo(ativo: string): boolean {
    const selectedAtivos = this.customerForm.get('ativos')?.value as string[];
    return selectedAtivos.includes(ativo);
  }

  toQueryParams(formValue: any): string {
    return Object.keys(formValue)
      .filter((key) => !!formValue[key])
      .map(
        (key) =>{
            if(key === "generos"){
              return formValue[key].map((value: string) => encodeURIComponent("genero") + '=' + encodeURIComponent(value)).join('&');
            }else if(key === "ativos"){
              return formValue[key].map((value: string) => encodeURIComponent("ativo") + '=' + encodeURIComponent(value)).join('&');
            }else return encodeURIComponent(key) + '=' + encodeURIComponent(formValue[key])
        }
      )
      .join('&');
  }
}
