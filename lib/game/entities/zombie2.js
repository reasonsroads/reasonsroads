ig.module(
    'game.entities.zombie2'
)
.requires(
    'impact.entity'
)
.defines(function(){
//  flying guy
EntityZombie2 = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/zombie_2.png', 16, 16 ),
    gravityFactor: 0,
    size: {x: 11, y: 14},
    offset: {x: 1, y:2},
    maxVel: {x: 30, y: 30},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 100,
    accelGround: 400,
    accelAir: 200,
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim('walk', .1, [0,1,2,3,4,5]);
    },
    update: function() {
    this.parent();
    var xdir = this.flip ? -1 : 1;
    this.vel.x = this.speed * xdir;
    this.currentAnim.flip.x = this.flip;
    


    var player = ig.game.getEntitiesByType( EntityPlayer )[0];
    var accel = this.standing ? this.accelGround : this.accelAir;
    if (player){if( player.pos.x < this.pos.x) {
        this.accel.x = -accel;
                this.flip = true;
    }else if ( player.pos.x  > this.pos.x  ){
        this.accel.x = accel;
                this.flip = false;
    }if ( player.pos.y > this.pos.y){
        this.vel.y = 30;
    }else if ( player.pos.y  < this.pos.y ){
        this.vel.y = -30;
    } else {
        return true;
    }
    }
    // var player = ig.game.getEntitiesByType( EntityPlayer )[0];
    // if (player){if( player.pos.x < this.pos.x) {
    //     this.vel.x = -30;
    // }else if ( player.pos.x  < this.pos.x  ){
    //     this.vel.x = 30;
    // }if ( player.pos.y > this.pos.y){
    //     this.vel.y = 30;
    // }else if ( player.pos.y  < this.pos.y ){
    //     this.vel.y = -30;
    // } else {
    //     return true;
    // }
    // }
    // var player = ig.game.getEntitiesByType( EntityPlayer )[0];
    // if (player){if( player.pos.x < this.pos.x) {
    //     this.vel.x = -30;
    // }else if ( player.pos.x  < this.pos.x  ){
    //     this.vel.x = -60;
    // }else if ( player.pos.y > this.pos.y){
    //     this.vel.y = 60;
    // }else if ( player.pos.y  > this.pos.y ){
    //     this.vel.y = -30;
    // } else {
    //     return true;
    // }
    // }


},
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    check: function( other ) {
        // lower number = less damage
        other.receiveDamage( 1, this );
    },
    //  removed damage

    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
            {particles: 2, colorOffset: 1});
        // Knockback
		// this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
		// this.vel.y = -300;
    },
    kill: function(){
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
            {colorOffset: 1});
        ig.game.stats.kills ++;
    },
    });
});


