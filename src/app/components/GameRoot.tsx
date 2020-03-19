import * as React from 'react'

export type GameRootProps = {
    createGame: (elementId:string)=>Phaser.Game,
}

export const GameRoot : React.FC<GameRootProps> = ({createGame})=>{
    const root = 'gameroot';
    React.useEffect(()=>{
        createGame(root)
    },[root])
    return <div id={root}></div>
}