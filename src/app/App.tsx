import * as React from "react";
import {TestButton} from './components/TestButton'
import {GameRoot} from './components/GameRoot'
import * as styles from '../styles/AppContainerStyle'

export type AppProps = {
    createGame: (elementId:string)=>Phaser.Game,
}

export const App : React.FC<AppProps> = ({createGame})=>{
    return <div style={styles.appContainer}>
        <TestButton type="DECREMENT" />
        <GameRoot createGame={createGame} />
        <TestButton type="INCREMENT" />
    </div>
}