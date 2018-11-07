var Breakout;
(function (Breakout) {
    var imageMap = (function () {
        function imageMap(setWidth, setHeight) {
            this.imageWidth = setWidth;
            this.imageHeight = setHeight;
        }
        imageMap.prototype.getImageWidth = function () {
            return this.imageWidth;
        };
        imageMap.prototype.getImageHeight = function () {
            return this.imageHeight;
        };
        return imageMap;
    }());
    Breakout.imageMap = imageMap;
})(Breakout || (Breakout = {}));
