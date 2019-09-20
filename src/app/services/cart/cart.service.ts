import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  baseUrl: any = JSON.parse(localStorage.getItem('baseUrl')).baseUrl+'cart';

  public getJSON(): Observable<any>{
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }

  insert(data){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, data, {headers});
  }

  update(data, i){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.put(this.baseUrl+'/'+i, data, {headers});
  }

  delete(i){
    console.log(this.baseUrl);
    
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.delete(this.baseUrl+'/'+i, {headers});
  }
}
