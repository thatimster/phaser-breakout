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
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super.call(this) || this;
            _this.outTint = 0xBBBBBB;
            _this.overTint = 0xFFFFFF;
            return _this;
        }
        MainMenu.prototype.create = function () {
            // Scaling properties
            var playScaleThreshold = 500;
            var titleScaleThreshold = 600;
            //scaling
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.refresh();
            //positioning
            var buttonStartOffset = window.innerHeight * 0.1;
            var buttonEndOffset = 50;
            var titleOffset = window.innerHeight * 0.1;
            //animation timing
            var buttonEntryTime = 1000;
            this.game.stage.backgroundColor = 0x333333;
            this.playButton = this.add.button(this.world.centerX, window.innerHeight + buttonStartOffset, 'playButton', this.fadeOut, this);
            this.playButton.anchor.setTo(0.5, 0.5);
            this.playButton.tint = this.outTint;
            this.playButton.onInputOver.add(this.mouseOver, this);
            this.playButton.onInputOut.add(this.mouseOut, this);
            this.title = this.add.sprite(this.world.centerX, this.world.centerY - titleOffset, 'title');
            this.title.anchor.setTo(0.5, 0.5);
            this.title.alpha = 0.0;
            if (this.game.width < titleScaleThreshold) {
                this.title.scale.set(1 / (this.title.width / (this.game.width / 1.5)));
            }
            this.add.tween(this.playButton).to({ y: this.world.centerY + buttonEndOffset }, buttonEntryTime, Phaser.Easing.Elastic.InOut, true);
            this.add.tween(this.title).to({ alpha: 1 }, this.titleFadeTime, Phaser.Easing.Linear.None, true);
        };
        MainMenu.prototype.mouseOver = function () {
            this.playButton.tint = this.overTint;
        };
        MainMenu.prototype.mouseOut = function () {
            this.playButton.tint = this.outTint;
        };
        MainMenu.prototype.fadeOut = function (buttonStartOffset) {
            var buttonExitTime = 750;
            var tween = this.add.tween(this.playButton).to({ y: window.innerHeight + buttonStartOffset }, buttonExitTime, Phaser.Easing.Elastic.InOut, true);
            this.add.tween(this.title).to({ alpha: 0 }, this.titleFadeTime, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('generateLevel', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Breakout.MainMenu = MainMenu;
})(Breakout || (Breakout = {}));
