ig.module(
    'game.entities.poison'
)
.requires(
    'impact.entity'
)
.defines(function(){
 
EntityPoison = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/poison.png', 16, 16 ),
    size: {x: 16, y: 16},
    gravityFactor: 0,
    offset: {x: 0, y:0},
    maxVel: {x: 100, y: 100},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 0,
    health: 1000,
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim('walk', .3, [0,1,2]);
    },
    // update: function() {
    //     // near an edge? return!
    //     if( !ig.game.collisionMap.getTile (
    //         this.pos.x + (this.flip ? +4 : this.size.x -4),
    //         this.pos.y + this.size.y+1
    //     )
    //     ) {
    //         this.flip = !this.flip;
    //     }
    // var xdir = this.flip ? -1 : 1;
    // this.vel.x = this.speed * xdir;
    // this.currentAnim.flip.x = this.flip;
    // this.parent();
    // },
    handleMovementTrace: function( res ) {
        this.parent( res );
        //collision with a wall? return~
        if( res.collision.x ) {
            this.flip = !this.flip;
        }
    },
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
    check: function( other ) {
        // lower number = less damage
        other.receiveDamage( .3, this );
    },
    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
        ig.game.spawnEntity(EntityDeathExplosion2, this.pos.x, this.pos.y,
            {particles: 2, colorOffset: 1});
    },
    kill: function(){
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion2, this.pos.x, this.pos.y,
            {colorOffset: 1});
    },
    });
    
    EntityDeathExplosionParticle2 = ig.Entity.extend({
        size: {x: 4, y: 4},
        maxVel: {x: 40, y: 250},
        lifetime: 5,
        fadetime: 1,
        bounciness: 1,
        vel: {x: 400, y: 200},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 1,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.PASSIVE,
        checkAgainst: ig.Entity.TYPE.A,
        gravityFactor: -1,
        check: function( other ){
            other.receiveDamage( 1, this );
            this.kill();
        },
        animSheet: new ig.AnimationSheet( 'media/blood_green.png', 4, 4 ),
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
EntityDeathExplosion2 = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 5,
        init: function(x, y,settings){
            this.parent(x, y, settings);
            for(var i = 0; i < this.particles; i++)
            ig.game.spawnEntity(EntityDeathExplosionParticle2, x, y,
                {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
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
});

