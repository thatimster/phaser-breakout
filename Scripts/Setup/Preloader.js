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
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.loadingText = this.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", { font: "20px Arial", fill: "#ffffff", align: "center" });
            this.loadingText.anchor.set(0.5);
            //  Load our actual games assets
            this.load.image('playButton', 'Graphics/playButton.png');
            this.load.image('title', 'Graphics/title.png');
            this.load.image('ball', 'Graphics/ball.png');
            this.load.image('life', 'Graphics/life.png');
            this.load.image('paddle', 'Graphics/paddle.png');
            this.load.image('brick', 'Graphics/brick.png');
            this.load.image('gameOver', 'Graphics/gameOver.png');
            this.load.image('menuButton', 'Graphics/menu.png');
            this.load.image('youWon', 'Graphics/youWon.png');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.loadingText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('mainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Breakout.Preloader = Preloader;
})(Breakout || (Breakout = {}));
