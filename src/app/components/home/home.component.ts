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
  @Input() try: any = 'hello';
  qty: any[] = []
  shopItems: any;
  
  constructor(private store: Store<{ items: Item[]}>, private itemService: ItemsService) { 
    this.items = store.pipe(select('cart'));

    // console.log(this.items);
  }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.store.dispatch(new ItemGet(''));
    this.store.select('items').subscribe((data)=>{
      this.shopItems = data; 
      this.qty.length = this.shopItems.length
      this.qty.fill(1);
    })
    
    // this.itemService.getJSON().subscribe((data)=>{
    //   this.shopItems = data;
      
    // })
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

  addItem(name, price, qty, id){
    var status = false;
    this.items.subscribe(data=>{
      if(data.length > 0){
        status = true; 
      }
      console.log(data.length);
    })

    const item = new Item();
    item.name = name;
    item.price = price;
    item.qty = qty;
    item.id = id
    // if(status == false){
      this.store.dispatch(new ItemAdd(item))
    // }else{
    //   let obj = {
    //     item: item,
    //     id: 0
    //   }  
    //   this.store.dispatch(new ItemUpdate(obj))
    // } 
  }

}
        // this.items.subscribe(data=>{
        //   let existing = false
        //   let index = 0;
        //   let itemid = 0;
        //   data.forEach(element => {
        //     if(id == element.id){
        //       existing = true;
        //       itemid = index;
        //     }   
        //     index++;
        //   });
        //   if(existing){
        //     let obj = {
        //       item: item,
        //       id: 0
        //     }
            
        //     this.store.dispatch(new ItemUpdate(obj))
        //   }else{
        //     this.store.dispatch(new ItemAdd(item))
        //   }
        // })