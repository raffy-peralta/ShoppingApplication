import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransactionGet } from 'src/app/actions/transactions.action';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  transactions: any;
  id: any;
  empty: boolean
  constructor(private transactionsService: TransactionsService, private store: Store<{transactions: any[]}>) { 

  } 

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('details')).id
    this.getTransactions();
  }

  getTransactions(){
    this.empty = false;
    this.store.dispatch(new TransactionGet(''));
    this.store.select('transactions').subscribe((data)=>{
      this.transactions = data; 
      console.log(data);
      if(this.transactions.length != 0){
        data.forEach(element => {
          if(element.userId == this.id){
            this.empty = false;
            // console.log(this.empty)
            return this.empty;
          }else{
            this.empty = true;
            // console.log(this.empty)
          }
        });
      }else{
        this.empty = true;
      }
    })
    console.log(this.transactions);
    // this.transactionsService.getTransactions().subscribe((data)=>{
    //   console.log(data);
      
    // })
    
  }

}
