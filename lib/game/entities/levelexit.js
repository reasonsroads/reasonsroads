ig.module (
    'game.entities.levelexit'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityLevelexit = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 8, y: 8},
        level: null,
        checkAgainst: ig.Entity.TYPE.A,
        check:function(other){
            if(other instanceof (EntityPlayer) && ig.input.pressed('continue')) {
                console.log('level exit hehe')
                    ig.game.toggleStats(this);
            }else if(other instanceof (EntityPlayer_3) && ig.input.pressed('continue')) {
                console.log('level exit huh')
                    ig.game.toggleStats(this);
            }
            
            else if(other instanceof (EntityPaddlePlayer) && ig.input.pressed('continue')) {
                console.log('level exit heee')
                    ig.game.toggleStats(this);
            }
            },
            draw: function(){
                if(this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1; this.parent();
            },
            nextLevel: function(){
                if(this.level){
                    var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b) {
                        return a.toUpperCase() + b;
                    });
                    ig.game.loadLevelDeferred( ig.global['Level'+levelName]);
                }
        }
    });
});

// level exit works