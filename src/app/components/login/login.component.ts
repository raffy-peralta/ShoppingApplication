import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Store } from '@ngrx/store';
import { CartActionTypes, ItemAdd } from 'src/app/actions/cart.action';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  accounts: Observable<String>;
  cart: any[];
  constructor(private accountService: AccountService, private router: Router,
     private authService: AuthService, private cartService: CartService, private store: Store<{items: Item[]}>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  login(){
    this.accountService.getJSON().subscribe(accounts => { this.accounts = accounts.users
      accounts.forEach(element => {
        
        if(element.username == this.loginForm.get('username').value && element.password == 
        this.loginForm.get('password').value){
          console.log("true")
          let json = {"name": element.name, "username": element.username, "email": element.email, 
          "id": element.id};
          
          this.cartService.getJSON().subscribe((data)=>{
            this.cart = data;
            
            this.cart.forEach(element2 => {
              if(element2.userId == element.id){
                element2.items.forEach((element3, index, array) => {
                  // console.log(element3);
                  this.store.dispatch(new ItemAdd(element3));
                  if (index === array.length -1){
                    this.authService.login(json);
                  }
                });
              } 
            }); 
          })  
        }else{
          // this.error = true;
        }
      });
    });
  }

}
