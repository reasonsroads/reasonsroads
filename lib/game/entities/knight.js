ig.module(
    'game.entities.knight'
)
.requires(
    'impact.entity',
    'game.entities.chatbubble_green'
)
.defines(function(){
 
EntityKnight = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/knight.png', 16, 16 ),
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
            var parameters = {text: 'Ah, so you all have caught up. I tried to get through as many of them as possible.', tracks: this.name, margin: 0, lifeSpan: 4, shape: 'square', name: bubbleName, color:[255,255,255]};
            ig.game.spawnEntity(EntityChatbubble_green, 0, 0, parameters);
          }
        }
      },
    });

});