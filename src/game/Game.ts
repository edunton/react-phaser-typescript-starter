import 'phaser';
import {BootScene} from './scenes/BootScene'
import {IntroScene} from './scenes/IntroScene'

export const gameRatio = 1;

export class Game extends Phaser.Game{
    constructor(rootId:string){
        const cfg = config(rootId);
        cfg.scene = [BootScene,IntroScene]
        super(cfg);
    }
    preload(): void {
        this.boot();
        this.scene.game.input.addPointer();
    }
}


type Config = Phaser.Types.Core.GameConfig;

let _config : Config | null = null;

const config = (rootId:string) : Config => {
    if(_config != null) return _config;
  
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
  
    let width : number, height : number;
    if(windowRatio < gameRatio){
        width = windowWidth;
        height = (windowWidth / gameRatio);
    }
    else{
        width = (windowHeight * gameRatio);
        height = windowHeight;
    }
    _config = {
      type: Phaser.AUTO,
      width,
      height,
      physics: {
          default: "arcade",
      },
      input: {
          keyboard:false
      },
      parent:rootId
    }
  
    return _config;
};