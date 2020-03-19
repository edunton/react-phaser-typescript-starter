import * as React from "react";
import { useSelector, useDispatch } from '../state'
import { ScoreDirection } from '../../store/GameStateTypes'

export const TestButton : React.FC<{type:ScoreDirection}> = ({type}) => {
    const state = useSelector(state => state.score)
    const dispatch = useDispatch();
    const op = type === 'INCREMENT' ? '+' : '-'
    return <button type="button" onClick={()=>dispatch({type})} className={`ctrl-btn ${type === 'INCREMENT' ? 'up-btn' : 'down-btn'}`}>
        {state} {op} 1
    </button>
}