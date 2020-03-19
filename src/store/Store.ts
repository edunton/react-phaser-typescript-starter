import * as redux from 'redux';
import * as gst from './GameStateTypes';

const initState : gst.GameState = {
    score : 0,
}

function rootReducer(state:gst.GameState = initState, action:gst.ActionType){
    switch (action.type) {
        case 'INCREMENT':
            return {score:state.score+1}
        case 'DECREMENT':
            return {score:state.score-1}
        default:
            return state
    }
}

export const store = redux.createStore(rootReducer)

// export type StoreState<T> = [T,(newValue:T)=>void]

// const record: Record<string,StoreState<any>> = {}

// export function initStoreState<T>(key:string, initialValue:T):void{
//     if(key in record){
//         throw new Error(`initStoreState('${key}',...) can only be called once in life of program`);
//     }

//     const changeCallback = (val:T)=>{
//         record[key][0] = val;
//     }

//     record[key] = [initialValue,changeCallback];
// };

// export function useStoreState<T>(key:string):StoreState<T>{
//     if(!(key in record)){
//         throw new Error(`initStoreState('${key}',...) was not called before calling useStorState('${key}')`);
//     }

//     return record[key];
// };