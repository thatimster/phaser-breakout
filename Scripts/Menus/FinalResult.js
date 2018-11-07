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
    var finalResult = (function (_super) {
        __extends(finalResult, _super);
        function finalResult() {
            var _this = _super.call(this) || this;
            _this.outTint = 0xBBBBBB;
            _this.overTint = 0xFFFFFF;
            return _this;
        }
        finalResult.prototype.init = function (setColor, won) {
            this.stage.backgroundColor = setColor;
            this.won = won;
        };
        finalResult.prototype.create = function () {
            var titleScaleThreshold = 600;
            var menuScaleThreshold = 500;
            var titleOffset = window.innerHeight * 0.1;
            var buttonStartOffset = window.innerHeight * 0.2;
            var fadeInTime = 500;
            var titleSize = [this.game.cache.getImage('gameOver').width, this.game.cache.getImage('gameOver').height];
            if (this.won) {
                this.title = this.add.sprite(this.game.world.centerX, this.game.world.centerY - titleOffset, 'youWon');
            }
            else {
                this.title = this.add.sprite(this.game.world.centerX, this.game.world.centerY - titleOffset, 'gameOver');
            }
            this.title.anchor.setTo(0.5, 0.5);
            this.title.alpha = 0;
            this.add.tween(this.title).to({ alpha: 1 }, fadeInTime, Phaser.Easing.Linear.None, true);
            if (this.game.width < titleScaleThreshold) {
                this.title.scale.set(1 / (this.title.width / (this.game.width / 1.5)));
            }
            this.menuButton = this.add.button(this.world.centerX, this.world.centerY + buttonStartOffset, 'menuButton', this.fadeOutButton, this);
            ;
            this.menuButton.alpha = 0;
            this.menuButton.anchor.setTo(0.5, 0.5);
            this.menuButton.tint = this.outTint;
            this.menuButton.onInputOver.add(this.mouseOver, this);
            this.menuButton.onInputOut.add(this.mouseOut, this);
            this.add.tween(this.menuButton).to({ alpha: 1 }, fadeInTime, Phaser.Easing.Linear.None, true);
            if (this.game.width < menuScaleThreshold) {
                this.menuButton.scale.set(1.5 / (this.menuButton.width / (this.game.width / 4)));
            }
        };
        finalResult.prototype.fadeOutButton = function () {
            var fadeOutTime = 500;
            var tween = this.add.tween(this.menuButton).to({ alpha: 0 }, fadeOutTime, Phaser.Easing.Linear.None, true);
            this.add.tween(this.title).to({ alpha: 0 }, fadeOutTime, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenuState, this);
        };
        finalResult.prototype.mouseOver = function () {
            this.menuButton.tint = this.overTint;
        };
        finalResult.prototype.mouseOut = function () {
            this.menuButton.tint = this.outTint;
        };
        finalResult.prototype.startMainMenuState = function () {
            this.state.start('mainMenu', true, false);
        };
        return finalResult;
    }(Phaser.State));
    Breakout.finalResult = finalResult;
})(Breakout || (Breakout = {}));
