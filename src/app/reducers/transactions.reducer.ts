import { TransactionActionTypes, ActionEx } from '../actions/transactions.action';
import { State } from '@ngrx/store';


export const initialState = [];
export function TransactionsReducer(state = initialState, action: ActionEx){
    switch(action.type){

        case TransactionActionTypes.Get:
            return action.payload;

        case TransactionActionTypes.GetSuccess:
            return action.payload;
            
        default:
            return state;
    }
}


