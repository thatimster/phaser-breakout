var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Breakout;
(function (Breakout) {
    var gameLoop = (function (_super) {
        __extends(gameLoop, _super);
        function gameLoop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        gameLoop.prototype.init = function (lives, bricks, text, textures, titleBar) {
            this.brickPhysicsSet = bricks;
            this.scoreText = text;
            this.suspend = true;
            this.player = new Breakout.Player(this.game, lives, textures, this.brickPhysicsSet.getAt(0));
            this.titleBar = titleBar;
        };
        gameLoop.prototype.create = function () {
            this.player.initPlayer();
            this.physics.enable(this.titleBar, Phaser.Physics.ARCADE);
            this.titleBar.body.immovable = true;
        };
        gameLoop.prototype.update = function () {
            if (this.player.launchKey.isDown && this.suspend) {
                this.player.launchBall();
                this.player.mainBall.body.onWorldBounds = new Phaser.Signal();
                this.player.mainBall.body.onWorldBounds.add(this.hitWorldBounds, this);
                this.suspend = false;
            }
            if (!this.suspend) {
                this.game.physics.arcade.overlap(this.player.mainBall, this.brickPhysicsSet, this.collisionHandler, null, this);
                this.game.physics.arcade.overlap(this.player.mainBall, this.titleBar, this.topBarHit, null, this);
                this.game.physics.arcade.overlap(this.player.mainBall, this.player.mainPaddle, this.paddleHit, null, this);
            }
            this.player.checkPlayerInput();
            this.scoreText.text = "Score: " + String(this.player.getScore());
        };
        gameLoop.prototype.collisionHandler = function (ball, newBrick) {
            var xVel = Math.abs(ball.body.velocity.x);
            var yVel = Math.abs(ball.body.velocity.y);
            //Directional impact + bounce velocity
            if (newBrick.body.touching.down && ball.position.y > newBrick.position.y) {
                ball.body.velocity.y = yVel;
            }
            else if (newBrick.body.touching.up && ball.position.y < newBrick.position.y) {
                ball.body.velocity.y = -yVel;
            }
            else if (newBrick.body.touching.left && ball.position.x < newBrick.position.x) {
                ball.body.velocity.x = -xVel;
            }
            else if (newBrick.body.touching.right && ball.position.x > newBrick.position.x) {
                ball.body.velocity.x = xVel;
            }
            else {
                if (ball.position.x < newBrick.position.x) {
                    ball.body.velocity.x = -xVel;
                }
                else if (ball.position.x > newBrick.position.x) {
                    ball.body.velocity.x = xVel;
                }
                if (ball.position.y > newBrick.position.y) {
                    ball.body.velocity.y = yVel;
                }
                else if (ball.position.y < newBrick.position.y) {
                    ball.body.velocity.y = -yVel;
                }
            }
            // Add brick value;
            this.player.addScore(newBrick.getScoreValue());
            this.brickPhysicsSet.remove(newBrick, true, true);
            // Winning State
            if (this.brickPhysicsSet.length == 0) {
                this.state.start('finalResult', true, false, this.stage.backgroundColor, true);
            }
        };
        gameLoop.prototype.paddleHit = function (ball, paddle) {
            // Average out x and y velocity
            var newVelocity = this.player.newVelocity;
            var yVel = Math.abs(ball.body.velocity.y);
            if (paddle.body.touching.up) {
                ball.body.velocity.y = (-yVel + -newVelocity) / 2;
                ball.body.velocity.x = (paddle.body.velocity.x + ball.body.velocity.x) / 2;
            }
        };
        gameLoop.prototype.topBarHit = function (ball, bar) {
            var yVel = Math.abs(ball.body.velocity.y);
            ball.body.velocity.y = yVel;
        };
        gameLoop.prototype.hitWorldBounds = function (sprite, up, down) {
            // Ground is hit, lose a life
            if (down) {
                this.player.resetPosition();
                this.suspend = true;
                this.penaltyText = this.add.text(this.game.world.centerX, this.game.world.centerY, "Life Lost!", { font: "64px Arial", align: "center", fill: "#ffffff" });
                this.penaltyText.anchor.setTo(0.5, 0.5);
                this.penaltyText.alpha = 1.0;
                var fadeAnim = this.add.tween(this.penaltyText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                fadeAnim.onComplete.add(this.removePenaltyText, this);
            }
            // Losing State
            if (this.player.noLives()) {
                this.state.start('finalResult', true, false, this.stage.backgroundColor, false);
            }
        };
        gameLoop.prototype.removePenaltyText = function () {
            this.penaltyText.destroy();
        };
        return gameLoop;
    }(Phaser.State));
    Breakout.gameLoop = gameLoop;
})(Breakout || (Breakout = {}));
