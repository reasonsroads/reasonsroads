ig.module(
    'game.entities.archer'
)
.requires(
    'impact.entity',
    'game.entities.chatbubble_green'
)
.defines(function(){
 
EntityArcher = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/archer.png', 16, 16 ),
    size: {x: 11, y: 14},
    offset: {x: 8, y:2},

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim('walk', .7, [0,1,]);
    },
    update: function() {

    this.speak();
    this.parent();
    },
    speak: function() {
        if (Math.random() < .005) {
          var bubbleName = this.name + 'Bubble';
          if(!ig.game.getEntityByName(bubbleName)) {
            var parameters = {text: 'They are everywhere!', tracks: this.name, margin: 0, lifeSpan: 4, shape: 'square', name: bubbleName, color:[255,255,255]};
            ig.game.spawnEntity(EntityChatbubble_green, 0, 0, parameters);
          }
        }
      },
    });

});