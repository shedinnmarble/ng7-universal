import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from '../core/customer.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {

  constructor(private customerService: CustomerService) {}
  customers: any;
  ngOnInit() {
    this.getList().subscribe(c =>{
      this.customers = c;
    })
  }
  getList() {

    return this.customerService.getList().pipe(
      tap(x => {
      console.log(">>>>>>>>>>>>>>xxx", x)
    }))
  }

}
