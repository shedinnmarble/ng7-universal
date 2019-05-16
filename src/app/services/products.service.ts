import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products$ = new ReplaySubject(1);
  constructor() {
    const products = [
      {
        'name': 'Plexus Slim',
        'desc': 'I\'m a good product'
      },
      {
        'name': 'Plexus MetaBurn',
        'desc': 'I\'m a good product'
      },
      {
        'name': 'Plexus Lean',
        'desc': 'I\'m a good product'
      }
    ];
    this.products$.next(products);
  }
  getProducts(): any {
    return this.products$;
  }

  updateProducts(product) {
    this.products$.next(product);
  }
}
