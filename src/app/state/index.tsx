import * as redux from 'react-redux'
import * as gst from '../../store/GameStateTypes'
import * as react from 'react'

export function useSelector<T>(callback:(state:gst.GameState)=>T){
    return redux.useSelector<gst.GameState,T>(callback)
}

export function useDispatch(){
    return redux.useDispatch<react.Dispatch<gst.ActionType>>()
}

export function useStore(){
    return redux.useStore<gst.GameState, gst.ActionType>()
}