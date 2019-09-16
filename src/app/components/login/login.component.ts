import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  accounts: Observable<String>;
  constructor(private accountService: AccountService, private router: Router, private authService: AuthService) { }

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
          this.authService.login(json);
          // if(element.role == 1){
          //   // this.authService.loginAdmin(json);
          // }else if(element.role == 2){
          //   // this.authService.login(json);
          // }
          // // this.error = false;
          
        }else{
          console.log("false");
          // this.error = true;
        }

      });
    });
  }

}
