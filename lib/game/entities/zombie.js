ig.module(
    'game.entities.zombie'
)
.requires(
    'impact.entity'
)
.defines(function(){
 
EntityZombie = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 16 ),
    size: {x: 11, y: 14},
    offset: {x: 3, y:2},
    maxVel: {x: 100, y: 100},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 14,
    health: 10,
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim('walk', .07, [0,1,2,3,4,5]);
    },
    update: function() {
        // near an edge? return!
        if( !ig.game.collisionMap.getTile (
            this.pos.x + (this.flip ? +4 : this.size.x -4),
            this.pos.y + this.size.y+1
        )
        ) {
            this.flip = !this.flip;
        }
    var xdir = this.flip ? -1 : 1;
    this.vel.x = this.speed * xdir;
    this.currentAnim.flip.x = this.flip;
    this.parent();
    },
    handleMovementTrace: function( res ) {
        this.parent( res );
        //collision with a wall? return~
        if( res.collision.x ) {
            this.flip = !this.flip;
        }
    },
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    // Lite makes them get pushed off, Passive they stop
    collides: ig.Entity.COLLIDES.LITE,
    check: function( other ) {
        // lower number = less damage
        other.receiveDamage( 1, this );
    },
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
 

