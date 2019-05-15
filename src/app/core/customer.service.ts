import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private host;
  constructor(
    private transferState: TransferState,
    private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
      this.host = 'http://localhost:4000/';
    }
  getList(): Observable < any > {

    let chacheKey = `customers-list-cache-key-`;
    const cachedData = this.transferState.get(this.cacheKey(chacheKey), null);
    if (cachedData) {
      return of(cachedData);
    }
    return this.http.get(`${this.host}apiii/customers`).pipe(
      tap(data => {
        this.transferState.set(this.cacheKey(chacheKey), data);
      })
    )
  }
  /**
   * get transfer state key wrapper.
   * @param type key name
   */
  private cacheKey(type: string) {
    return makeStateKey < string > (`${type}`);
  }
}
