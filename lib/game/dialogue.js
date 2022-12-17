
ig.module(
	'game.dialogue'
)
.requires(
	'impact.entity',
)
.defines(function(){
    StartScreen = ig.Game.extend( {
        mainCharacter: new ig.Image( 'media/roads2.png' ),
        title: new ig.Image( 'media/game-title.png' ),
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image( 'media/screen-bg.png' ),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start' );
        },
        update: function() {
            if(ig.input.pressed ('start')) {
                ig.system.setGame(StartScreen2)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            this.mainCharacter.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height - 15;
            this.instructText.draw( 'Press Spacebar To Start', x+20, y-10,
            ig.Font.ALIGN.CENTER );
        }
    });
     
    // take 2
     
    StartScreen2 = ig.Game.extend( {
        mainCharacter: new ig.Image( 'media/face.png' ),
        // title: new ig.Image( 'media/gradient.png' ),
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image( 'media/gradient.png' ),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start' );
        },
        update: function() {
            if(ig.input.pressed ('start')) {
                ig.system.setGame(StartScreen3)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            this.mainCharacter.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height - 10;
            this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
            ig.Font.ALIGN.CENTER );
        }
    });
     
    // take 3
     
    StartScreen3 = ig.Game.extend( {
        mainCharacter: new ig.Image( 'media/face2.png' ),
        // title: new ig.Image( 'media/gradient.png' ),
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image( 'media/gradient.png' ),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start' );
        },
        update: function() {
            if(ig.input.pressed ('start')) {
                ig.system.setGame(StartScreen4)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            this.mainCharacter.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height - 10;
            this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
            ig.Font.ALIGN.CENTER );
        }
    });
    
    // take 4
     
    StartScreen4 = ig.Game.extend( {
        mainCharacter: new ig.Image( 'media/face3.png' ),
        // title: new ig.Image( 'media/gradient.png' ),
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image( 'media/gradient.png' ),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start' );
        },
        update: function() {
            if(ig.input.pressed ('start')) {
                ig.system.setGame(StartScreen5)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            this.mainCharacter.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height - 10;
            this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
            ig.Font.ALIGN.CENTER );
        }
    });
    
    // take 5
     
    StartScreen5 = ig.Game.extend( {
        mainCharacter: new ig.Image( 'media/desert_screen.png' ),
        // title: new ig.Image( 'media/gradient.png' ),
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image( 'media/gradient.png' ),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start' );
        },
        update: function() {
            if(ig.input.pressed ('start')) {
                ig.system.setGame(StartScreen6)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            this.mainCharacter.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height - 10;
            this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
            ig.Font.ALIGN.CENTER );
        }
    });
    // instruction
     
    StartScreen5 = ig.Game.extend( {
        mainCharacter: new ig.Image( 'media/instruction.png' ),
        // title: new ig.Image( 'media/gradient.png' ),
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image( 'media/gradient.png' ),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start' );
        },
        update: function() {
            if(ig.input.pressed ('start')) {
                ig.system.setGame(MyGame)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            this.mainCharacter.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height - 10;
            this.instructText.draw( 'Press Space to continue.', x+20, y,
            ig.Font.ALIGN.CENTER );
        }
    });
});