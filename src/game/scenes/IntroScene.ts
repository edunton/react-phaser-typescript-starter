import BaseScene from './BaseScene'

export class IntroScene extends BaseScene {
    private text: Phaser.GameObjects.Text
    private upSprite: Phaser.GameObjects.Sprite
    private downSprite: Phaser.GameObjects.Sprite
    constructor(){
        super('Intro');
    }

    create(){
        this.text = this.add.text(100, 100, this.getScore(), { color: this.getColor() });

        this.upSprite = this.physics.add.sprite(100,200,'button.up');
        this.downSprite = this.physics.add.sprite(250,200,'button.down');

        this.upSprite.setDisplaySize(32,32)
        this.downSprite.setDisplaySize(32,32)

        this.anims.create({
            key: 'up.anim',
            frames: this.anims.generateFrameNumbers('button.up', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        
        this.anims.create({
            key: 'down.anim',
            frames: this.anims.generateFrameNumbers('button.down', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.upSprite.play('up.anim')
        this.downSprite.play('down.anim')

        this.upSprite.setInteractive()
        this.downSprite.setInteractive()

        this.upSprite.on('pointerup',()=>{this.dispatch({type:'INCREMENT'})})
        this.downSprite.on('pointerup',()=>{this.dispatch({type:'DECREMENT'})})
    }

    preload() { }
    update() 
    { 
        this.text.text = this.getScore()
        this.text.setFill(this.getColor());
    }

    getScore() {
        let score = this.state.score;
        return `The score is ${score}!`
    }

    getColor(){
        let score = this.state.score;
        if(score == 0){
            return '#fff'
        }
        if(score < 0){
            return '#f00'
        }

        return '#0f0'
    }
}