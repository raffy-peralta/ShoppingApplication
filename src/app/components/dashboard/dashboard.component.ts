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


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', 
  ]
})
export class DashboardComponent implements OnInit {
  storeItems: Observable<any> 
  cart: Observable<Item[]>
  empty: boolean;
  total: any = 0;
  profile: Observable<any>
  
  constructor(private modalService: NgbModal, private store: Store<{items: Item[]}>,
    private itemsService: ItemsService, private router: Router, private authService: AuthService,
    private transactionsService: TransactionsService) {
      this.cart = store.pipe(select('cart'));
   }

  ngOnInit() {
    // this.cart = this.home
  }

  checkCart(){
    this.cart.subscribe(data=>{
      console.log(data.length);
      
      if(data.length == 0){
        this.empty = true;
      }else{
        this.empty = false;
        console.log('pumapasok');
        
        this.totalCart(); 
      }
    })
  }

  removeCustomer(index){
    this.store.dispatch(new ItemRemove(index));
  }

  totalCart(){
    this.total = 0;
    this.cart.subscribe(data=>{
      data.forEach(element => {
        this.total = this.total + (element.price*element.qty)
      });
      
    })
    // this.total = 0
    // let i = 0
    // this.cart.forEach(element => {
    //   this.total = this.total + (parseInt(element[i].price)*element[i].qty)
    //   i++;
    //   console.log(element);
      
    // });
  }
  openComment(content) {    
    
    // console.log(this.cart);
    this.checkCart();
   
    this.modalService.open(content, {scrollable: true});
  }
  
  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }


  checkout(){
    
    this.modalService.dismissAll();
    this.itemsService.getJSON().subscribe((item)=>{
      this.storeItems = item;
      console.log(item);
      
      this.cart.subscribe(data=>{
        data.forEach(element => {        
          item.forEach(element2 => {          
            if(element2.id == element.id){
              let json = {
                name: element.name,
                price: element.price,
                stock: (element2.stock-element.qty),
                img: element2.img
              }
              this.itemsService.update(json, element.id).subscribe((data)=>{       
              })
            } 
          });
        });
        let json = {
          items: data,
          date: Date(),
          userId: JSON.parse(localStorage.getItem('details')).id
        }
        console.log(json);
        
        this.transactionsService.insertTransactions(json).subscribe((data)=>{
          this.store.dispatch(new ItemRemoveAll())
          location.reload();
        });
      })
    })  
  }

}
