import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { tap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productsService: ProductsService) { }
  products: any;
  products$: any;
  index = 1;
  isComponentAlive = true;
  ngOnInit() {
    this.productsService.getProducts()
    .pipe(
      takeWhile(() => this.isComponentAlive)
    )
    .subscribe(p => {
      console.log('>>>> I\'m Memory Leak from Product Component. inside the subscribe. 111');
      this.products = p;
    });
    this.products$ =  this.productsService.getProducts()
    .pipe(
      tap(x => {
        console.log('>>>> I\'m Memory Leak from Product Component. From Async Pipe');
      })
    );
  }

  updateProducts() {
    const newProducts = [
      {
        'name': 'Plexus Slim' + this.index,
        'desc': 'I\'m a good product'
      },
      {
        'name': 'Plexus MetaBurn' + this.index,
        'desc': 'I\'m a good product'
      },
      {
        'name': 'Plexus Lean' + this.index,
        'desc': 'I\'m a good product'
      }
    ];
    this.productsService.updateProducts(newProducts);
  }
  ngOnDestroy() {
    this.isComponentAlive = false;
  }


}
