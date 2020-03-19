import './styles/main.sass'

//store
import {store} from './store/Store'

//game
import {Game} from './game/Game'

//app
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {App} from './app/App'

ReactDOM.render(
  <Provider store={store}>
    <App createGame={(x)=>new Game(x)}/>
  </Provider>,
  document.getElementById("root-app")
);