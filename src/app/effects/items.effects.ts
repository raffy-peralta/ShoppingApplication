import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { ItemActionTypes, ItemGetSuccess } from '../actions/items.action';
import { ItemsService } from '../services/items/items.service';
 
 
@Injectable()
export class itemsEffect {
 
  constructor(private actions$: Actions, private itemsService: ItemsService) {}
  @Effect()
    getItems$: Observable<any> = this.actions$.pipe(ofType(ItemActionTypes.Get),
        switchMap(action => this.itemsService.getJSON()),
        map((items: any) => new ItemGetSuccess(items))
  );
}