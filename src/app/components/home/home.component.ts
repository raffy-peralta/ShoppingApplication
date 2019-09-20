import { Component, OnInit, Output, Input } from '@angular/core';
import { Item } from '../../models/item';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { ItemAdd, ItemUpdate } from 'src/app/actions/cart.action';
import { EventEmitter } from 'events';

import { FormControl } from '@angular/forms';
import { ItemsService } from 'src/app/services/items/items.service';
import { ItemGet } from 'src/app/actions/items.action';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
 ]
})

export class HomeComponent implements OnInit {
  items: Item[]
  cart: any[];
  qty: any[];
  shopItems: any[];
  search: string;
  itemStocks: any[];
  clicked: boolean = false;
  searchStatus: boolean = false;
  showNotFound: boolean = false;
  empty: boolean;
  constructor(private store: Store<{ items: Item[]}>, private itemService: ItemsService) { 

  }

  ngOnInit() {
    this.qty = []
    this.itemStocks = [];
    // this.items = this.store.pipe(select('cart'));
    this.store.select('cart').subscribe((data) => {
      this.items = data;
      console.log(data);
      
    })
    this.search = '';
    this.empty = false;
    // this.items.subscribe((data)=>{     
    //   this.cart = data;
      
      
    //   if(this.cart.length > 0){
    //     this.empty = false;
    //   }
      
    // })
    this.getItems();
    
  }

  getSearch(item){
    var result = item.split(' ').join('')
    this.empty = true;   
    if(this.shopItems.length != 0){
      this.shopItems.forEach(element => {        
        if(element.name.toLocaleLowerCase().includes(item.toLocaleLowerCase())){          
          this.empty = false;
        }else if(result.length != 0){
           this.empty = false;

        }
      });
    }else{
      this.empty = true;
    }
    return this.empty;
  } 

  searchItem(name): boolean{
    
    name = name.toLowerCase();  
    
    if(name.includes(this.search.toLocaleLowerCase())){
      this.searchStatus = true;
      this.showNotFound = false;
      return this.searchStatus;
    }else{  
      this.searchStatus = false;
      this.showNotFound = true;
      return this.searchStatus;
    }
  }

  getStocks(stocks, id): number{
    if(this.items){
      this.items.forEach(element => {
        if(id == element.id){
          stocks = stocks - element.qty; 
        }   
      });
    }
    return stocks;
  }

  

  getItems(){
    this.store.dispatch(new ItemGet(''));
    this.store.select('items').subscribe((data)=>{
      this.shopItems = data; 
      this.qty.length = this.shopItems.length;
      this.itemStocks.length = this.shopItems.length;
      this.qty.fill(1);
    })
    

  }

  addQty(index, maxQty){
    if(this.qty[index] < maxQty){
      this.qty[index] = this.qty[index] + 1;
    }
  }

  subQty(index){
    if(this.qty[index] > 1){
      this.qty[index] = this.qty[index] - 1;
    }
  }

  

  updateCart(name, price, qty, id, i){

    this.qty[i] = 1;
    var status = false;
    const item = new Item();
    item.name = name;
    item.price = price;
    item.qty = qty;
    item.id = id 
    var finish = new Promise((resolve, reject)=>{
      if(this.items.length === 0){
        this.store.dispatch(new ItemAdd(item))
      } else {
        this.items.forEach((value, index, array) => {
          if(id == value.id){
            value.qty = value.qty + qty
            status = true;
        
          }    
          if (index === array.length -1) {
            resolve();  
          }
        });
      }
    });
    finish.then(() => {    
      if(status){
        this.store.dispatch(new ItemUpdate(this.items))

      }else{
     
        this.store.dispatch(new ItemAdd(item))
      }
    })      
  }
}
       