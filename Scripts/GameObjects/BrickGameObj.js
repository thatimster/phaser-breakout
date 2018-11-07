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
    var newBrick = (function (_super) {
        __extends(newBrick, _super);
        function newBrick(currentGame, xPixels, yPixels, setSprite, setValue) {
            var _this = _super.call(this, currentGame, xPixels, yPixels, setSprite) || this;
            _this.scoreValue = setValue;
            return _this;
        }
        newBrick.prototype.getScoreValue = function () {
            return this.scoreValue;
        };
        return newBrick;
    }(Phaser.Sprite));
    Breakout.newBrick = newBrick;
})(Breakout || (Breakout = {}));
