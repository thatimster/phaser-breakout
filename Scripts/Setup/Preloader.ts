module Breakout {
 
    export class Preloader extends Phaser.State {
        
        loadingText: Phaser.Text;

        preload() {

            //  Set-up our preloader sprite
            this.loadingText = this.add.text(this.game.world.centerX,this.game.world.centerY,"Loading...",{font: "20px Arial",fill: "#ffffff",align: "center"});
            this.loadingText.anchor.set(0.5);

            //  Load our actual games assets
            this.load.image('playButton', 'Graphics/playButton.png');
            this.load.image('title', 'Graphics/title.png');
            this.load.image('ball','Graphics/ball.png');
            this.load.image('life','Graphics/life.png');
            this.load.image('paddle','Graphics/paddle.png');
            this.load.image('brick','Graphics/brick.png');
            this.load.image('gameOver','Graphics/gameOver.png');
            this.load.image('menuButton', 'Graphics/menu.png');
            this.load.image('youWon','Graphics/youWon.png');
        }
 
        create() {
 
            var tween = this.add.tween(this.loadingText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
 
        }
        
        startMainMenu() {
            this.game.state.start('mainMenu', true, false);
 
        }
 
    }
 
}