import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProfileGet } from 'src/app/actions/profile.action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accounts: Observable<any>;
  id: number
  changePassForm: any;
  error: boolean;
  name: string;
  email: string;
  role: number;
  username: string;
  constructor(private store: Store<{ items: any[]}>,private modalService: NgbModal, private accountsService: AccountService) { }
  
  ngOnInit() {
    this.accounts = this.store.pipe(select('accounts'));
    this.getProfile();
    this.id = JSON.parse(localStorage.getItem('details')).id
    this.changePassForm = new FormGroup({
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      confirmpass: new FormControl('', Validators.required)
    });

    this.name = JSON.parse(localStorage.getItem('details')).name;
    this.email = JSON.parse(localStorage.getItem('details')).email;
    this.role = JSON.parse(localStorage.getItem('details')).role;
    this.username = JSON.parse(localStorage.getItem('details')).username;
  }

  setError(status){
    this.error = status;
    return this.error;  
  }

  getProfile(){
    this.store.dispatch(new ProfileGet(''));
    this.store.select('accounts').subscribe((data)=>{
      this.accounts = data; 
      
      
      
    })
  }

  openModalChange(content) {
    this.changePassForm.reset();
    this.modalService.open(content);
  }

  savePass(){
    if(this.changePassForm.valid && this.changePassForm.get('password').value == this.changePassForm.get('confirmpass').value){
      let json = {
        name: this.name,
        password: this.changePassForm.get('password').value,
        username: this.username,
        role: this.role,
        email: this.email
      }
      this.accountsService.updateProfile(json, this.id).subscribe((data)=>{
        this.changePassForm.reset();
        this.modalService.dismissAll();
        console.log('success');
        
      });
      
    }
  }

}
