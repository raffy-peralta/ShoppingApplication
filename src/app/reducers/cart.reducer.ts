import { ActionEx, CartActionTypes} from '../actions/cart.action';
import { State } from '@ngrx/store';

export const initialState = [];
export function CartReducer(state = initialState, action: ActionEx){
    switch(action.type){
        case CartActionTypes.Add:
            var storage = [...state, action.payload]
            localStorage.setItem('state', JSON.stringify(storage));
            return storage;
        case CartActionTypes.Remove:
            var storage = [    
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1)
            ];  
            localStorage.setItem('state', JSON.stringify(storage));
            return storage;
        case CartActionTypes.Update:
            localStorage.setItem('state', JSON.stringify(action.payload));
            return action.payload
        case CartActionTypes.RemoveAll:
            state = [];
            localStorage.removeItem('state');
            return state;
        default:
            return loadState(state);
    }
}

function loadState(state){
    if(localStorage.getItem('state')){
        state = JSON.parse(localStorage.getItem('state'));
    }
    return state;
}


