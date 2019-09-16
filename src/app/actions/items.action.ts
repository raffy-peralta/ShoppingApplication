import {Action} from '@ngrx/store';

export enum ItemActionTypes {
    Get = '[Item Component] Get',
    GetSuccess = '[Item Component] Success'
}

export class ActionEx implements Action{
    readonly type;
    payload: any
}

export class ItemGet implements ActionEx{
    readonly type = ItemActionTypes.Get;
    constructor(public payload: any){
        
    }
}

export class ItemGetSuccess implements ActionEx{
    readonly type = ItemActionTypes.GetSuccess;
    constructor(public payload: any){
    
    }
}