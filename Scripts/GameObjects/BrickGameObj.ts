module Breakout{

    export class newBrick extends Phaser.Sprite implements gameObjectProperties{

        scoreValue: number;

        constructor(currentGame,xPixels,yPixels,setSprite,setValue){

            super(currentGame,xPixels,yPixels,setSprite);
            this.scoreValue = setValue;
            
        }
        getScoreValue(){

            return this.scoreValue;
        }
    }
    interface gameObjectProperties {
        
        getScoreValue();
    }
}