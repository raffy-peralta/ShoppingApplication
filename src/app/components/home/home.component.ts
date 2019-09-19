import { Component, OnInit, Output, Input } from '@angular/core';
import { Item } from '../../models/item';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { ItemAdd, ItemUpdate } from 'src/app/actions/cart.action';
import { EventEmitter } from 'events';

import { FormControl } from '@angular/forms';
import { ItemsService } from 'src/app/services/items/items.service';
import { ItemGet } from 'src/app/actions/items.action';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
 ]
})

export class HomeComponent implements OnInit {
  items: Observable<Item[]>
  cart: any[];
  qty: any[] = []
  shopItems: any;
  empty = true;
  search: string = '';
  clicked: boolean = false;
  searchStatus: boolean = false;
  showNotFound: boolean = false;
  constructor(private store: Store<{ items: Item[]}>, private itemService: ItemsService) { 
    

    // console.log(this.items);
  }
  showEmpty(): boolean{
    if(this.search.length == 0){
      this.showNotFound =  false;
    }else{
      if(this.searchStatus){
        this.showNotFound =  false;
      }else{
        this.showNotFound =  true;
      }
    }
    return this.showNotFound
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

  ngOnInit() {
    this.items = this.store.pipe(select('cart'));
    this.search = '';
    
    this.items.subscribe((data)=>{
      this.cart = data;
      if(this.cart.length > 0){
        this.empty = false;
      }
      
    })
    this.getItems();
    
  }

  getItems(){
    this.store.dispatch(new ItemGet(''));
    this.store.select('items').subscribe((data)=>{
      this.shopItems = data; 
      this.qty.length = this.shopItems.length
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

  

  updateCart(name, price, qty, id){
    
    // var foo = [1,2,3,4,5,6,7,8,9,10];
    // var bar = new Promise((resolve, reject) => {
      // foo.forEach((value, index, array) => {
      //     console.log(value);
      //     if (index === array.length -1) resolve();
      // });
    // });
    
    // bar.then(() => {
    //     console.log('All done!');
    // });

    var status = false;
    const item = new Item();
    item.name = name;
    item.price = price;
    item.qty = qty;
    item.id = id
    
    
      
      var finish = new Promise((resolve, reject)=>{

        if(this.cart.length === 0){
          this.store.dispatch(new ItemAdd(item))
        } else {
          this.cart.forEach((value, index, array) => {
          
            if(id == value.id){
              value.qty = value.qty + qty
              status = true;
              console.log(status);
              
            }    
            if (index === array.length -1) {
              resolve();  
            }
          });
        }
      });

      finish.then(() => {
        
        if(status){
          this.store.dispatch(new ItemUpdate(this.cart))
          console.log('update')
        }else{
          console.log('add1')
          
          this.store.dispatch(new ItemAdd(item))
        }
      })   
    
  
    
    
  }
}
       