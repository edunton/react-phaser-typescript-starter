import * as React from "react";
import { useSelector, useDispatch } from '../state'
import { ScoreDirection } from '../../store/GameStateTypes'
import * as styles from '../../styles/BtnStyle'

export const TestButton : React.FC<{type:ScoreDirection}> = ({type}) => {
    const state = useSelector(state => state.score)
    const dispatch = useDispatch();
    const op = type === 'INCREMENT' ? '+' : '-';

    return <button type="button" onClick={()=>dispatch({type})} style={type === 'INCREMENT' ? styles.upBtn : styles.downBtn}>
        {state} {op} 1
    </button>
}