ig.module(
	'game.entities.levelexit2'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityLevelexit2 = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 8, y: 8},
        level: null,
        checkAgainst: ig.Entity.TYPE.A,
        update: function(){},
        check: function( other ) {
            if(other instanceof (EntityPlayer) && ig.input.pressed('continue')) {
                console.log('level exit 2')
        		if( this.level ) {
        			var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
        			return a.toUpperCase() + b;
        		});
        		ig.game.loadLevelDeferred( ig.global['Level'+levelName] );
        		}
        	}
        },
        draw: function(){
            if(this.invincible)
            this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1; this.parent();
        },
    });
});
