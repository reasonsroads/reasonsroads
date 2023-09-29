ig.module(
	'game.entities.characterset'
)
.requires(
	'impact.entity',
)
.defines(function(){

    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 1,
        fadetime: 1,
        bounciness: 1,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        // type: ig.Entity.TYPE.NONE,
        // checkAgainst: ig.Entity.TYPE.BOTH,
        // collides: ig.Entity.COLLIDES.PASSIVE,
        // checkAgainst: ig.Entity.TYPE.A,
        // check: function( other ){
        //     other.receiveDamage( 10, this );
        //     this.kill();
        // },
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim('idle', 0.2, [frameID]);
            this.vel.x = (Math.random()*2-1) * this.vel.x;
            this.vel.y = (Math.random()*2-1) * this.vel.y;
            this.idleTimer = new ig.Timer();
        },
        update: function(){
            if(this.idleTimer.delta() > this.lifetime)
            {this.kill();
            return;}
            this.currentAnim.alpha = this.idleTimer.delta().map(
            this.lifetime - this.fadetime, this.lifetime, 1, 0);
            this.parent();
        }
    });
EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        fadetime: 2,
        callBack: null,
        particles: 4,
        init: function(x, y,settings){
            this.parent(x, y, settings);
            for(var i = 0; i < this.particles; i++)
            ig.game.spawnEntity(EntityDeathExplosionParticle, x, y,
                {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
        },
        size: {x: .5, y: .5},
        update: function() {
            if(this.idleTimer.delta() > this.lifetime)
            {this.kill();
            if(this.callBack)
            this.callBack();
            return;
        }
        }
 });
    EntityBullet = ig.Entity.extend({
        lifetime: 1,
        fadetime: 1,
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 200, y:0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y+8, settings);
            this.vel.x = this.accel.x = (settings.flip ? - this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
       
    check: function( other ) {
        other.receiveDamage( 2, this );
        this.kill();
    }
});
EntityBullet2 = ig.Entity.extend({
    lifetime: .02,
    fadetime: 1,
    size: {x: 6, y: 4},
    // change weapon image and image size
    animSheet: new ig.AnimationSheet( 'media/shield_splash.png', 7, 4 ),
    maxVel: {x: 0, y:20},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.ACTIVE,
    init: function( x, y, settings ) {
        this.parent( x + (settings.flip ? -9 : 10) , y+7, settings);
        this.vel.x = this.accel.x = (settings.flip ? - this.maxVel.x : this.maxVel.x);
        this.addAnim( 'idle', 0.2, [0] );
        this.idleTimer = new ig.Timer();
    },
   
check: function( other ) {
    other.receiveDamage( 10, this );
    this.kill();
},
update: function() {
    if(this.idleTimer.delta() > this.lifetime)
    {this.kill();
    if(this.callBack)
    this.callBack();
    return;
}
}
      
});
EntityGrenade = ig.Entity.extend({
    lifetime: 2.5,
    fadetime: 1,
    size: {x: 4, y: 4},
    offset: {x: 2, y:2},
    maxVel: {x: 100, y: 150},
    animSheet: new ig.AnimationSheet( 'media/grenade.png', 8, 8 ),
    collides: ig.Entity.COLLIDES.LITE,
    colorOffset: 0,
    totalColors: 7,
    type: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    checkAgainst: ig.Entity.TYPE.B,
    bounciness: 2,
    bounceCounter: 0,
    init: function( x, y, settings ) {
        this.parent( x + (settings.flip ? -4 : 7), y, settings);
        this.idleTimer = new ig.Timer();
        this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
        this.vel.y = -(50 + (Math.random()*300));
        this.addAnim('idle', 0.2, [0,1] );},
        

    handleMovementTrace: function( res ) {
        this.parent( res );
            if(this.idleTimer.delta() > this.lifetime)
            {this.kill();
            }
    },
    check: function( other ){
        other.receiveDamage( 5, this );
        this.kill();
    },
    kill: function(){
        for(var i = 0; i < 20; i++)
        ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
        this.parent();
    },
});

    EntityGrenadeParticle = ig.Entity.extend({
    size: {x: 1, y: 1},
    maxVel: {x: 160, y: 200},
        // type: ig.Entity.TYPE.NONE,
        // checkAgainst: ig.Entity.TYPE.BOTH,
        // collides: ig.Entity.COLLIDES.PASSIVE,
        // checkAgainst: ig.Entity.TYPE.A,
    lifetime: 1.5,
    fadetime: 2,
    bounciness: 1,
    vel: {x: 40, y: 50},
    friction: {x:20, y: 20},
    collides: ig.Entity.COLLIDES.LITE,
    animSheet: new ig.AnimationSheet ('media/explosion.png', 1, 1),
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        // change * # to lower numbers to get lower x/y
        this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
        this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
        this.idleTimer = new ig.Timer();
        var frameID = Math.round(Math.random()*7);
        this.addAnim( 'idle', 0.2, [frameID]);
    },
        // check: function( other ){
        //     other.receiveDamage( 10, this );
        //     this.kill();
        // },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime )
        {
            this.kill();
            return;
        }
        this.currentAnim.alpha = this.idleTimer.delta().map(
            this.lifetime - this.fadetime, this.lifetime,
            1, 0
        );
        this.parent();
        }
});

});
