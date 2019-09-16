import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: any;
  registerForm: any;
  accounts: Observable<String>;
  errorUsername: boolean = false;
  errorEmail: boolean = false;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.getAccounts();
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmpass: new FormControl('', Validators.required)
    });
  }

  checkUsername(){
    this.errorUsername = false;
    this.accounts.forEach(element => {
      if(element['username'] == this.registerForm.get('username').value){
        this.errorUsername = true;
      }
    });
  }
  checkEmail(){
    this.errorEmail = false;
    this.accounts.forEach(element => {
      if(element['email'] == this.registerForm.get('email').value){
        this.errorEmail = true;
      }
    });
  }

  getAccounts(){
    this.accountService.getJSON().subscribe((data)=>{
      this.accounts = data;
    })
  }

  register(){
    console.log('registered');
    if(this.registerForm.valid && !this.errorEmail && !this.errorUsername){
      console.log('valid');
      let json = {
        name: this.registerForm.get('name').value,
        password: this.registerForm.get('password').value,
        username: this.registerForm.get('username').value,
        role: 1,
        email: this.registerForm.get('email').value
      }
      this.accountService.register(json).subscribe((data)=>{
        this.router.navigate(['/login']);
      })
    }    
  }
  setError(status){
    this.error = status;
    return this.error;  
  }

}
