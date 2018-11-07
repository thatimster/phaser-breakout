module Breakout {
    export class Boot extends Phaser.State {

        create() {
            
            this.scale.pageAlignHorizontally = true;
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('preloader', true, false);
        }

    }
}