import { ItemActionTypes, ActionEx } from '../actions/items.action';
import { State } from '@ngrx/store';


export const initialState = [];
export function ItemsReducer(state = initialState, action: ActionEx){
    switch(action.type){

        case ItemActionTypes.Get:
            return action.payload;

        case ItemActionTypes.GetSuccess:
            return action.payload;
            
        default:
            return state;
    }
}


