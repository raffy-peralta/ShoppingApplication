import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { TransactionActionTypes, TransactionGetSuccess } from '../actions/transactions.action';
import { TransactionsService } from '../services/transactions/transactions.service';
 
 
@Injectable()
export class TransactionsEffect {
 
  constructor(private actions$: Actions, private transactionService: TransactionsService) {}
  @Effect()
    getItems$: Observable<any> = this.actions$.pipe(ofType(TransactionActionTypes.Get),
        switchMap(action => this.transactionService.getTransactions()),
        map((items: any) => new TransactionGetSuccess(items))
  );
}