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
      // this.host = 'http://localhost:4000/';
    }
  getList(): Observable < any > {

    const chacheKey = `customers-list-cache-key`;
    if (this.transferState.hasKey(this.cacheKey(this.cacheKey(chacheKey)))) {
      const cachedData = this.transferState.get(this.cacheKey(chacheKey), null);
      if (cachedData) {
        return of(cachedData);
      }
    }
    return this.http.get(`/api/customers`).pipe(
      tap(data => {
        console.log('>>>> data is set', data);
        this.transferState.set(this.cacheKey(chacheKey), data);
      })
    );
  }
  /**
   * get transfer state key wrapper.
   * @param type key name
   */
  private cacheKey(type: string) {
    return makeStateKey < string > (`${type}`);
  }
}
