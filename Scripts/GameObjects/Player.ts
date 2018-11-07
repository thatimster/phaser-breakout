module Breakout{

    export class Player{

        game: Phaser.Game;
        score: number;
        lives: Phaser.ArraySet;
        setCursorKeys: Phaser.CursorKeys;
        launchKey: Phaser.Key;
        ghostBall: Phaser.Sprite;
        mainBall: Phaser.Sprite;
        mainPaddle: Phaser.Sprite;
        promptText: Phaser.Text;
        textureStats: Phaser.ArraySet;
        brickRef: Phaser.Sprite;
        newVelocity: number;

        constructor(setGame, startingLives,textures,brickref){
            this.brickRef = brickref;
            this.score = 0;
            this.lives = startingLives;
            this.game = setGame;
            this.textureStats = textures;
            this.newVelocity = 0.5*window.innerHeight;
        }

        initPlayer(){

            var paddleWidth = this.brickRef.width;
            var paddleHeight = this.brickRef.height;


            var promptDisplacement = paddleHeight*1.5;


            // Controls
            this.setCursorKeys = this.game.input.keyboard.createCursorKeys();
            this.launchKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            // Paddle
            this.mainPaddle = this.game.add.sprite(
                this.game.world.centerX,
                this.game.height *0.9,'paddle');
            this.game.physics.enable(this.mainPaddle,Phaser.Physics.ARCADE);
            this.mainPaddle.anchor.set(0.5,0.5);
            this.mainPaddle.scale.set(this.brickRef.width/this.mainPaddle.width);
            this.mainPaddle.body.immovable = true;
            this.mainPaddle.body.collideWorldBounds=true;
            
            // Ball
            this.ghostBall = this.game.add.sprite(
                0, 
                -this.mainPaddle.height,'ball');
            this.ghostBall.anchor.set(0.5,0.5);
            
            this.ghostBall.visible = true;
            this.ghostBall.scale.set(this.brickRef.scale.y/this.ghostBall.scale.y);
            this.mainPaddle.addChild(this.ghostBall);
            

            this.promptText = new Phaser.Text(
                        this.game,
                        0,
                        promptDisplacement, 
                        "Press Space to launch", 
                        {font:"42px Arial",fill: "#ffffff",align:"center"});
            this.promptText.anchor.set(0.5,0.5);
            
            this.mainPaddle.addChild(this.promptText);
            
        }

        launchBall(){

            this.promptText.text = "";
            this.mainBall = this.game.add.sprite(this.ghostBall.worldPosition.x,this.ghostBall.worldPosition.y,'ball');
            this.mainBall.anchor.setTo(0.5,0.5);
            this.game.physics.enable(this.mainBall,Phaser.Physics.ARCADE);
            this.mainBall.body.setCircle((this.brickRef.height/2)-3);
            this.mainBall.body.tilePadding.setTo(0.05*window.innerHeight,0.05*window.innerHeight);
            this.mainBall.scale.set(this.mainPaddle.scale.x);
            this.mainBall.body.bounce.set(1);
            this.mainBall.body.collideWorldBounds=true;
            this.mainBall.body.velocity.setTo(this.game.rnd.integerInRange(-this.newVelocity,this.newVelocity),-this.newVelocity);
            this.ghostBall.visible = false;
            
        }

        resetPosition(){

            this.promptText.text = "Press Space to Launch";
            this.ghostBall.visible = true;
            this.mainBall.destroy();
            this.removeLife();
        }

        checkPlayerInput(){
            if (this.setCursorKeys.left.isDown || this.game.input.activePointer.x < this.game.world.centerX && this.game.input.activePointer.isDown){
                this.mainPaddle.body.velocity.x = -this.newVelocity;
            } else if (this.setCursorKeys.right.isDown|| this.game.input.activePointer.x > this.game.world.centerX && this.game.input.activePointer.isDown){
                this.mainPaddle.body.velocity.x = this.newVelocity;
            } else {
                this.mainPaddle.body.velocity.x = 0;
            }
        }

        getScore(){

            return this.score;
        }

        addScore(amount){
            
            this.score += amount;
        }

        noLives(){

            if (this.lives.list.length ==0){
                return true;
            } else {
                return false;
            }
        }

        removeLife(){

            var lifeSprite =this.lives.list[this.lives.total-1]       
            this.lives.remove(lifeSprite);
            lifeSprite.destroy();
        }

    }
}