import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  baseUrl: any = JSON.parse(localStorage.getItem('baseUrl')).baseUrl+'items';
  baseUrlHistory: any = JSON.parse(localStorage.getItem('baseUrl')).baseUrl+'transactions';
  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  

  update(data, i){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.put(this.baseUrl+'/'+i, data, {headers});
  }
}
