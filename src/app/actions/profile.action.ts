import {Action} from '@ngrx/store';

export enum ProfileActionTypes {
    Get = '[Profile Component] Get',
    GetSuccess = '[Profile Component] Success'
}

export class ActionEx implements Action{
    readonly type;
    payload: any
}

export class ProfileGet implements ActionEx{
    readonly type = ProfileActionTypes.Get;
    constructor(public payload: any){
        
    }
}

export class ProfileGetSuccess implements ActionEx{
    readonly type = ProfileActionTypes.GetSuccess;
    constructor(public payload: any){
    
    }
}