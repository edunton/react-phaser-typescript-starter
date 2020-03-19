import {store} from '../../store/Store'

export class BaseScene extends Phaser.Scene {
    protected get state() { return store.getState() }
    protected get dispatch() {return store.dispatch }
    protected get subscribe() { return store.subscribe }
    constructor(config: string|Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }
}

export default BaseScene;