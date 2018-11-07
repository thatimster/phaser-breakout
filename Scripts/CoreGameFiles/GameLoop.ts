module Breakout{

    export class gameLoop extends Phaser.State{

        player: Player;
        brickPhysicsSet: Phaser.Group;
        scoreText: Phaser.Text;
        suspend: boolean;
        penaltyText: Phaser.Text;
        titleBar: Phaser.Sprite;

        init(lives,bricks,text,textures, titleBar){

            this.brickPhysicsSet = bricks;
            this.scoreText = text;
            this.suspend=true;
            this.player = new Player(this.game,lives,textures, this.brickPhysicsSet.getAt(0));
            this.titleBar = titleBar;
        }

        create(){

            this.player.initPlayer();
            this.physics.enable(this.titleBar,Phaser.Physics.ARCADE);
            this.titleBar.body.immovable = true;
        }

        update(){

            if(this.player.launchKey.isDown && this.suspend){

                this.player.launchBall();
                this.player.mainBall.body.onWorldBounds = new Phaser.Signal();
                this.player.mainBall.body.onWorldBounds.add(this.hitWorldBounds, this);
                this.suspend = false;

            }

            if (!this.suspend){
                this.game.physics.arcade.overlap(this.player.mainBall,this.brickPhysicsSet,this.collisionHandler,null,this);
                this.game.physics.arcade.overlap(this.player.mainBall,this.titleBar,this.topBarHit,null,this);
                this.game.physics.arcade.overlap(this.player.mainBall,this.player.mainPaddle, this.paddleHit,null, this);   
            }

            this.player.checkPlayerInput();
            this.scoreText.text = "Score: "+String(this.player.getScore());
        }
        

        collisionHandler(ball, newBrick){

            var xVel = Math.abs(ball.body.velocity.x);
            var yVel = Math.abs(ball.body.velocity.y);

            //Directional impact + bounce velocity
            if (newBrick.body.touching.down && ball.position.y > newBrick.position.y){

                ball.body.velocity.y = yVel;

            } else if (newBrick.body.touching.up && ball.position.y < newBrick.position.y){

                ball.body.velocity.y = -yVel;

            } else if (newBrick.body.touching.left && ball.position.x < newBrick.position.x){

                ball.body.velocity.x = -xVel;

            } else if (newBrick.body.touching.right && ball.position.x > newBrick.position.x){

                ball.body.velocity.x = xVel;
            } else{
                if (ball.position.x < newBrick.position.x){
                    ball.body.velocity.x = -xVel;
                } else if (ball.position.x > newBrick.position.x){
                    ball.body.velocity.x = xVel;
                }
                if (ball.position.y > newBrick.position.y){
                    ball.body.velocity.y = yVel;
                } else if (ball.position.y < newBrick.position.y){
                    ball.body.velocity.y = -yVel;
                }
            }

            // Add brick value;
            this.player.addScore(newBrick.getScoreValue());
            this.brickPhysicsSet.remove(newBrick,true,true);

            // Winning State
            if (this.brickPhysicsSet.length == 0){
                this.state.start('finalResult',true,false,this.stage.backgroundColor,true);
            }
        }


        paddleHit(ball, paddle){
            // Average out x and y velocity
            var newVelocity = this.player.newVelocity;
            var yVel = Math.abs(ball.body.velocity.y);

            if (paddle.body.touching.up){
                ball.body.velocity.y = (-yVel + -newVelocity)/2;
                ball.body.velocity.x = (paddle.body.velocity.x + ball.body.velocity.x)/2;
            }
        }

        topBarHit(ball,bar){
            var yVel = Math.abs(ball.body.velocity.y)
            ball.body.velocity.y = yVel;
        }

        hitWorldBounds(sprite,up,down){
            // Ground is hit, lose a life
            if(down){

                this.player.resetPosition();
                this.suspend = true;
                this.penaltyText = this.add.text(this.game.world.centerX,this.game.world.centerY,"Life Lost!",{font: "64px Arial", align:"center", fill: "#ffffff"});
                this.penaltyText.anchor.setTo(0.5,0.5);
                this.penaltyText.alpha = 1.0;
                var fadeAnim = this.add.tween(this.penaltyText).to({alpha:0},1000,Phaser.Easing.Linear.None,true);
                fadeAnim.onComplete.add(this.removePenaltyText,this);
            }

            // Losing State
            if (this.player.noLives()){
                
                this.state.start('finalResult',true,false,this.stage.backgroundColor,false)
            }
        }

        removePenaltyText(){

            this.penaltyText.destroy();
        }

    }
}