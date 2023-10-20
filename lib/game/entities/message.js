ig.module(
    'game.entities.message'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityMessage = ig.Entity.extend({
    _wmDrawBox: true,
    _wmBoxColor: 'rgba( 255, 0, 0, 0.5)',
    _wmScalable: true,

    message: 'you got kills',
    killTimer: null,
    font: new ig.Font( 'media/04b03.font.png' ),

    checkAgainst: ig.Entity.TYPE.BOTH,

    update: function(){},

    check: function( other ) {
        
        this.killTimer = new ig.Timer( 4 );
    },

    draw: function(){
        if( this.killTimer && this.killTimer.delta() < 0 ) {
            this.font.draw( this.message, ig.system.width/5, ig.system.height/1.6 );
        }
    }
});

});