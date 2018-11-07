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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = 
            //setSize based on browser Window;
            _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null) || this;
            _this.state.add('boot', Breakout.Boot, false);
            _this.state.add('preloader', Breakout.Preloader, false);
            _this.state.add('mainMenu', Breakout.MainMenu, false);
            _this.state.add('generateLevel', Breakout.generateLevel, false);
            _this.state.add('gameLoop', Breakout.gameLoop, false);
            _this.state.add('finalResult', Breakout.finalResult, false);
            _this.state.start('boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Breakout.Game = Game;
})(Breakout || (Breakout = {}));
