import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: any = JSON.parse(localStorage.getItem('baseUrl')).baseUrl+'users';
  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any>{
    
    return this.http.get(this.baseUrl);
  }

  register(data){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, data, {headers});
  }
}
