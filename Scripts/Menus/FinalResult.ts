module Breakout{

    export class finalResult extends Phaser.State{

        menuButton: Phaser.Button;
        title: Phaser.Sprite;
        outTint: number;
        overTint: number;
        won: boolean;

        constructor(){

            super();
            this.outTint = 0xBBBBBB;
            this.overTint = 0xFFFFFF;
        }

        init(setColor, won){

            this.stage.backgroundColor = setColor;
            this.won = won;
        }
        create(){
            var titleScaleThreshold = 600;
            var menuScaleThreshold = 500;

            var titleOffset = window.innerHeight*0.1;
            var buttonStartOffset = window.innerHeight*0.2;
            var fadeInTime = 500;
            var titleSize = [this.game.cache.getImage('gameOver').width,this.game.cache.getImage('gameOver').height];

            if (this.won){

                 this.title = this.add.sprite(this.game.world.centerX,this.game.world.centerY-titleOffset,'youWon');
            } else{

                 this.title = this.add.sprite(this.game.world.centerX,this.game.world.centerY-titleOffset,'gameOver');
            }

            this.title.anchor.setTo(0.5,0.5);
            this.title.alpha = 0;
            this.add.tween(this.title).to({alpha:1},fadeInTime,Phaser.Easing.Linear.None,true);
            if (this.game.width < titleScaleThreshold){
                this.title.scale.set(1/(this.title.width/(this.game.width/1.5)));
            }

            this.menuButton = this.add.button(this.world.centerX, this.world.centerY+buttonStartOffset, 'menuButton',this.fadeOutButton,this);;
            this.menuButton.alpha = 0;
            this.menuButton.anchor.setTo(0.5, 0.5);
            this.menuButton.tint = this.outTint;
            this.menuButton.onInputOver.add(this.mouseOver,this);
            this.menuButton.onInputOut.add(this.mouseOut,this);
            this.add.tween(this.menuButton).to({alpha:1},fadeInTime,Phaser.Easing.Linear.None,true);
            if (this.game.width < menuScaleThreshold){
                this.menuButton.scale.set(1.5/(this.menuButton.width/(this.game.width/4)));
            }
        }
        fadeOutButton(){

            var fadeOutTime = 500;
            var tween = this.add.tween(this.menuButton).to({alpha:0},fadeOutTime,Phaser.Easing.Linear.None,true);
            this.add.tween(this.title).to({alpha:0},fadeOutTime,Phaser.Easing.Linear.None,true);
            tween.onComplete.add(this.startMainMenuState, this);
        }

        mouseOver(){

            this.menuButton.tint = this.overTint;
        }
        mouseOut(){

            this.menuButton.tint = this.outTint;
        }

        startMainMenuState(){
            
            this.state.start('mainMenu',true,false)
        }
    }
}