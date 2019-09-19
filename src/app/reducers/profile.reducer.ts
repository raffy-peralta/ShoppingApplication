import { ProfileActionTypes, ActionEx } from '../actions/profile.action';
import { State } from '@ngrx/store';


export const initialState = [];
export function ProfileReducer(state = initialState, action: ActionEx){
    switch(action.type){

        case ProfileActionTypes.Get:
            return action.payload;

        case ProfileActionTypes.GetSuccess:
            return action.payload;
            
        default:
            return state;
    }
}


