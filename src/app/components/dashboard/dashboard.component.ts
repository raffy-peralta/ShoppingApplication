import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';


import { ItemRemove, ItemRemoveAll } from 'src/app/actions/cart.action';
import { HomeComponent } from '../home/home.component';
import { element } from 'protractor';
import { ItemsService } from 'src/app/services/items/items.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', 
  ]
})
export class DashboardComponent implements OnInit {

  storeItems: Observable<any> 
  cart: Item[]
  empty: boolean;
  total: any = 0;
  profile: Observable<any>
  id: any;
  dbCart: any[];

  constructor(private modalService: NgbModal, private store: Store<{items: Item[]}>,
    private itemsService: ItemsService, private router: Router, private authService: AuthService,
    private transactionsService: TransactionsService, private cartService: CartService) {
    
   }

  ngOnInit() {   

    this.id = JSON.parse(localStorage.getItem('details')).id
    
    this.store.select('cart').subscribe((data) => {
      this.cart = data;
    })
    console.log(this.cart);
    

    this.cartService.getJSON().subscribe((cart)=>{
      this.dbCart = cart;
    })

    this.itemsService.getJSON().subscribe((data)=>{
      this.storeItems = data;
    })

    this.checkCart();

  }


  checkCart(){
    console.log(this.cart.length);

    if(this.cart.length == 0){
      this.empty = true;
    }else{
      this.empty = false;  
      this.totalCart(this.cart); 
    }  
  }

  removeCustomer(index){
    this.store.dispatch(new ItemRemove(index));
    this.checkCart();
    
  }

  totalCart(data){
    this.total = 0;

      data.forEach(element => {
        this.total = this.total + (element.price*element.qty)
      });

  }
  openComment(content) {    
    this.checkCart();
    this.modalService.open(content, {scrollable: true});
  }
  
  checkIfCartExists(): boolean{
    let exists = false;
    console.log(this.dbCart);
    
    this.dbCart.forEach(element => {
      if(element.id === this.id){
        exists = true;
      }
    });

    return exists;
  }

  logout(){
    let json = {
      items: this.cart,
      id: this.id 
    }

    if(this.cart.length > 0){
      if(this.checkIfCartExists()){
        this.cartService.update(json, this.id).subscribe();
      }else{
        this.cartService.insert(json).subscribe();
      }
    }

    this.authService.logout();
    this.store.dispatch(new ItemRemoveAll);
    this.router.navigate(['login']);
    
  }

  removeAll(){
    this.store.dispatch(new ItemRemoveAll);
    this.checkCart();
  }


  checkout(){
    this.modalService.dismissAll();    

    this.cart.forEach(element => {        
      //update stocks of items
      this.storeItems.forEach(element2 => {          
        if(element2.id == element.id){
          let json = {
            name: element.name,
            price: element.price,
            stock: (element2.stock-element.qty),
            img: element2.img
          }
          this.itemsService.update(json, element.id).subscribe()
        } 
      });
    });  
    
    let json = {
      items: this.cart,
      date: Date(),
      userId: JSON.parse(localStorage.getItem('details')).id
    }

    this.transactionsService.insertTransactions(json).subscribe();
    
    if(this.checkIfCartExists()){
      this.cartService.delete(this.id).subscribe();
    }
    this.store.dispatch(new ItemRemoveAll())
    location.reload();
    // this.router.navigate(['/dashboard/history']) 
  }
}
