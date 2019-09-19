import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { ProfileActionTypes, ProfileGetSuccess } from '../actions/profile.action';

import { AccountService } from '../services/account/account.service';
 
 
@Injectable()
export class ProfileEffect {
 
  constructor(private actions$: Actions, private accountService: AccountService) {}
  @Effect()
    getAccounts$: Observable<any> = this.actions$.pipe(ofType(ProfileActionTypes.Get),
        switchMap(action => this.accountService.getJSON()),
        map((account: any) => new ProfileGetSuccess(account))
  );
}