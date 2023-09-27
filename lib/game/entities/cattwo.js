ig.module(
    'game.entities.cattwo'
)
.requires(
    'impact.entity'
)
.defines(function(){
 
EntityCattwo = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/suki.png', 16, 16 ),
    size: {x: 11, y: 14},
    offset: {x: 8, y:2},
    maxVel: {x: 100, y: 100},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 0,
    health: 10,
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim('walk', .18, [0,1,2,3,      
]);
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
    var parameters = {text: 'Be resourceful! You have your juggling balls.', tracks: this};
    ig.game.spawnEntity(EntityChatbubble, 0, 0, parameters);
    },
    handleMovementTrace: function( res ) {
        this.parent( res );
        //collision with a wall? return~
        if( res.collision.x ) {
            this.flip = !this.flip;
        }
    },
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
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
 

