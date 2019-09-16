import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  baseUrl: any = JSON.parse(localStorage.getItem('baseUrl')).baseUrl+'transactions';
  constructor(private http: HttpClient) { }

  public getTransactions():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  public insertTransactions(data){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, data, {headers});
  }
}
