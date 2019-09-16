import {Action} from '@ngrx/store';

export enum TransactionActionTypes {
    Get = '[Transaction Component] Get',
    GetSuccess = '[Transaction Component] Success'
}

export class ActionEx implements Action{
    readonly type;
    payload: any
}

export class TransactionGet implements ActionEx{
    readonly type = TransactionActionTypes.Get;
    constructor(public payload: any){
        
    }
}

export class TransactionGetSuccess implements ActionEx{
    readonly type = TransactionActionTypes.GetSuccess;
    constructor(public payload: any){
    
    }
}