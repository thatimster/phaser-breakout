module Breakout {
    
    export class Game extends Phaser.Game {
        
        constructor() {

            //setSize based on browser Window;
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content',null);

            this.state.add('boot', Breakout.Boot, false);
            this.state.add('preloader', Breakout.Preloader, false);
            this.state.add('mainMenu', Breakout.MainMenu, false);
            this.state.add('generateLevel', Breakout.generateLevel,false);
            this.state.add('gameLoop', Breakout.gameLoop,false);
            this.state.add('finalResult',Breakout.finalResult,false);
            this.state.start('boot');
        }
 
    }
 
} 