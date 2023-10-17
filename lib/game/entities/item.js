ig.module(
'game.entities.item'
)
.requires(
'impact.entity'
)
.defines(function() {

EntityItem = ig.Entity.extend({
    health: 1000,
    size: {x: 9, y: 12},
    flip: false,
    gravityFactor: 0,
    // allow collision detection with other entities
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/shell.png', 16, 16),
    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
            {particles: 2, colorOffset: 1});
        // Knockback
		// this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
		// this.vel.y = -300;
    },
    init: function(x, y){
        this.parent(x, y);
        this.addAnim('spin', 0.2, [0,1,2,3,4,2]);
        },
        check: function(other){
            this.kill();
            ig.game.spawnEntity(EntityFedback, this.pos.x, this.pos.y);
            // add to the score on top
            ig.game.score_points += 1;
            // score summary
            ig.game.stats.score_points += 1;
            }
});
EntityFedback = ig.Entity.extend({
    size: {x:16, y: 16},
    flip: false,
    gravityFactor: 0,
    animSheet: new ig.AnimationSheet('media/feedback.png', 16, 16),
    init: function(x, y){
        this.parent(x, y);
        this.addAnim('feedback', 0.07, [0,1,2,3,5,6]);
        this.killTimer = new ig.Timer();
        },
        update: function(){
        this.parent();
        // destroy after a second
        if(this.killTimer.delta() > 0.5){
        this.kill();
        }
        },
});
});