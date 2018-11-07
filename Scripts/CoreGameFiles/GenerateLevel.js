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
    var generateLevel = (function (_super) {
        __extends(generateLevel, _super);
        function generateLevel() {
            var _this = _super.call(this) || this;
            //objects needed for gameloop
            _this.textureStats = {};
            _this.startingLives = 4;
            _this.livesIconSet = new Phaser.ArraySet([]);
            return _this;
        }
        generateLevel.prototype.create = function () {
            this.brickPhysicsSet = this.add.physicsGroup(Phaser.Physics.ARCADE);
            this.setupTextures();
            this.TitleBar();
            this.Bricks();
            this.state.start('gameLoop', false, false, this.livesIconSet, this.brickPhysicsSet, this.scoreText, this.textureStats, this.titleBar);
        };
        generateLevel.prototype.setupTextures = function () {
            var textures = ['brick', 'ball', 'paddle', 'life'];
            for (var _i = 0, textures_1 = textures; _i < textures_1.length; _i++) {
                var image = textures_1[_i];
                var newImage = this.game.cache.getImage(image);
                this.textureStats[image] = new Breakout.imageMap(newImage.width, newImage.height);
            }
        };
        generateLevel.prototype.TitleBar = function () {
            // Scaling properties
            var headerThreshold = 1000;
            var livesThreshold = 500;
            if (this.game.height < headerThreshold) {
                this.headerSize = 0.075 * this.game.height;
            }
            else {
                this.headerSize = 50;
            }
            //style
            var livesIconSize = 32;
            if (this.game.width < livesThreshold) {
                livesIconSize = (this.headerSize * 2) / 3;
            }
            var livesOffset = this.headerSize / 2;
            //setup titlebar
            this.titleBar = this.add.sprite(0, 0, 'brick');
            this.titleBar.width = this.game.width;
            this.titleBar.height = this.headerSize;
            this.titleBar.tint = 0x777777;
            //setup lives icons
            var i;
            var displace = livesOffset;
            for (i = 0; i < this.startingLives; i++) {
                var added = this.add.sprite(this.game.width - displace, livesOffset, 'life');
                added.width = livesIconSize;
                added.height = livesIconSize;
                added.anchor.setTo(0.5, 0.5);
                this.livesIconSet.add(added);
                displace += livesIconSize;
            }
            //setup score text
            this.scoreText = this.add.text(this.headerSize / 5, this.headerSize / 5, "Score: " + String(0), { font: "32px Arial", fill: "#ffffff" });
            if (this.game.height < 1000) {
                var setScale = this.headerSize / 48;
                this.scoreText.scale.set(setScale);
            }
        };
        generateLevel.prototype.Bricks = function () {
            //initial generation variables
            var brickOffset = 2;
            var brickYScale = 1;
            var brickXScale = 1;
            var brickHeight = this.textureStats['brick'].getImageHeight();
            var brickWidth = this.textureStats['brick'].getImageWidth();
            if (this.game.height < 800) {
                brickYScale = (this.game.height * 0.05) / brickHeight;
            }
            if (this.game.width < brickWidth * 6) {
                brickXScale = (this.game.width) / (6 * brickWidth);
            }
            else if (this.game.width > brickWidth * 12) {
                brickXScale = (this.game.width) / (13 * brickWidth);
            }
            var padding = this.getPadding(brickOffset, brickXScale);
            var numColumns = this.getColumns(brickOffset, brickXScale);
            var Colors = [0xff0000, 0xffDD00, 0x00ff00, 0x00ffff, 0x0055ff];
            var numRows = Colors.length;
            var startingX = (padding + this.textureStats['brick'].getImageWidth() * brickXScale) / 2;
            var startingY = this.headerSize * 1.5;
            var displaceX = startingX;
            var displaceY = startingY;
            var scoreValue = 64;
            var i, j;
            for (j = 0; j < numRows; j++) {
                for (i = 0; i < numColumns; i++) {
                    var brickToAdd = this.brickPhysicsSet.add(new Breakout.newBrick(this.game, displaceX, displaceY, 'brick', scoreValue));
                    brickToAdd.tint = Colors[j];
                    brickToAdd.anchor.setTo(0.5, 0.5);
                    this.physics.enable(brickToAdd, Phaser.Physics.ARCADE);
                    brickToAdd.body.immovable = true;
                    brickToAdd.body.tilePadding.setTo(0.1 * window.innerHeight, 0.1 * innerHeight);
                    brickToAdd.scale.x = brickXScale;
                    brickToAdd.scale.y = brickYScale;
                    // big screen
                    if (brickXScale > 1) {
                        var text = new Phaser.Text(this.game, 0, 0, String(scoreValue), { font: "12px Comic Sans MS", fill: "#ffffff" });
                        brickToAdd.addChild(text);
                        text.anchor.setTo(0.5, 0.5);
                        text.scale.x = 1 / brickXScale;
                    }
                    displaceX += this.textureStats['brick'].getImageWidth() * brickXScale + brickOffset;
                }
                displaceY += this.textureStats['brick'].getImageHeight() * brickYScale + brickOffset;
                displaceX = startingX;
                scoreValue /= 2;
            }
        };
        generateLevel.prototype.getPadding = function (brickOffset, scale) {
            //(windoWidth % brickSize + offset)
            return (this.game.width % ((this.textureStats['brick'].getImageWidth() * scale) + brickOffset));
        };
        generateLevel.prototype.getColumns = function (brickOffset, scale) {
            //extra padding space - game width = integer output
            return (this.game.width - (this.getPadding(brickOffset, scale) * 2)) / ((this.textureStats['brick'].getImageWidth() * scale) + brickOffset);
        };
        return generateLevel;
    }(Phaser.State));
    Breakout.generateLevel = generateLevel;
})(Breakout || (Breakout = {}));
