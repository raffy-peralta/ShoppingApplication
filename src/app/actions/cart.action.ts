import {Action} from '@ngrx/store';

export enum CartActionTypes {
    Add = '[Item Component] Add',
    Remove = '[Item Component] Remove',
    Update = '[Item Component] Update',
    RemoveAll = '[Item Component] RemoveAll'
    
}

export class ActionEx implements Action{
    readonly type;
    payload: any
}

export class ActionNew implements Action{
    readonly type;

}

export class ItemAdd implements ActionEx{
    readonly type = CartActionTypes.Add;
    constructor(public payload: any){
        
    }
}
export class ItemRemove implements ActionEx {
    readonly type = CartActionTypes.Remove;
    constructor(public payload: any) {
    }
}
export class ItemUpdate implements ActionEx{
    readonly type = CartActionTypes.Update;
    constructor(public payload: any) {
    }
}

export class ItemRemoveAll implements ActionNew{
    readonly type = CartActionTypes.RemoveAll;
    constructor(){
    }
}

  