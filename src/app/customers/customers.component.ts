import { Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit, OnChanges {

  constructor(private customerService: CustomerService, private productsService: ProductsService) {}
  customers$: any;
  // index = 1;
  ngOnInit() {
    this.customers$ =  this.getList();
  }
  getList() {
    return this.customerService.getList();
  }
  updateProducts() {
    const newProducts = [
      {
        'name': 'Plexus Slim' + new Date(),
        'desc': 'I\'m a good product'
      },
      {
        'name': 'Plexus MetaBurn' + new Date(),
        'desc': 'I\'m a good product'
      },
      {
        'name': 'Plexus Lean' + new Date(),
        'desc': 'I\'m a good product'
      }
    ];
    this.productsService.updateProducts(newProducts);
  }
  ngOnChanges(value) {
    console.log('>>changes', value);
  }

}
