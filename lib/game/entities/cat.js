ig.module(
    'game.entities.cat'
)
.requires(
    'impact.entity'
)
.defines(function(){
 
EntityCat = ig.Entity.extend({
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
        this.addAnim('walk', .18, [0,1,2,3,0,1,2,3,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,12,13,14,15,8,9,10,11,4,5,6,7,           
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
    var parameters = {text: 'My name is Suki!', tracks: this};
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
 

ig.module(
	'game.entities.chatbubble'
  ).requires(
	'impact.entity',
	'impact.font'
  ).defines(function() {
	  
	   EntityChatbubble = ig.Entity.extend({
	  
	  //Shape of the chat bubble: Square, oval or rounded (square with rounded corners)
	  shape: 'rounded',
	  //Corner radius. Only used when the shape parameter is set to rounded
	  radius: 5,
	  //Text to be displayed in chat bubble
	  text: '',
	  //Padding of text
	  padding: 10,
	  //Font to be used. Either ig.Font instance or name of the font to be used
	  font: 'Arial',
	  //Font size, only used if not using instance of ig.Font
	  fontSize: 12,
	  //Font color. [red,green,blue]. Only used if not using instance of ig.Fong
	  fontColor:[0,0,0],
	  //Lifespan of the entity in seconds. 0 means permanent
	  lifeSpan: 0,
	  //Color of the chat bubble. [red,green,blue]
	  color:[255,255,255],
	  //Border color for the bubble. [red,green,blue] or null. No border is darawn if null
	  borderColor: null,
	  //Border width in pixels
	  borderWidth: 0,
	  //Opacity - 0.1 - 1
	  opacity: '0.5',
	  //Name of, or reference to, the entity that the chat bubble tracks. 
	  tracks: null,
	  //How far is the chat bubble from entity (pixels)
	  margin:5,
	  
	  _context:null,
	  _bubbleWidth:0,
	  _bubbleHeight:0,
	  _timeLeft: null, 	
	  
	  collides: ig.Entity.COLLIDES.NONE,
	  
		 init: function(x, y, settings) {
	  
		this.parent(x, y, settings);
			  
			  this._context = ig.system.context;
		  
		  if ( !(this.font instanceof ig.Font) ) {
			  
			  this._context.font = this.fontSize + 'px ' + this.font;
			  
			  var metrics = this._context.measureText(this.text);
			  this._bubbleWidth = metrics.width+2*this.padding;
			  this._bubbleHeight = this.determineFontHeight()+2*this.padding;
			  
		  }
			  
			  if ( !(this.color instanceof Array) ) {
			  
				  this.color = this.hexToRgb(this.color);
				  
				  if ( !(this.fontColor instanceof Array) ) {
					  this.fontColor = this.hexToRgb(this.fontColor);
				  }
				  
			  }
			  
			  if ( this.borderColor ) {
				  
				  if ( !(this.borderColor instanceof Array) ) {
					  this.borderColor = this.hexToRgb(this.borderColor);
				  }
				  
			  }
			  
			  if ( this.lifeSpan > 0 ) {
				  this._timeLeft = new ig.Timer();
				  this._timeLeft.set(this.lifeSpan);	
			  }
			  
	  },
	  
	  update: function() {
		  
		  /*
			  For some reason the widthMap array will or might not be populated in init() method. 
			  Hence we must get the string width/height in update
		  */
		  if ( (this.font instanceof ig.Font) && this._bubbleHeight == 0 ) {
			  
			  this._bubbleWidth = this.font.widthForString(this.text)+2*this.padding;
			  this._bubbleHeight = this.font.heightForString(this.text)+2*this.padding;
				  
		  }
		  
		  if ( this.lifeSpan > 0 ) {
			  if ( this._timeLeft.delta() > 0 ) {
					this.kill();
			if(this.callback) {
			  this.callback();
			}
				}
			}
  
		  // Note (mtg101): clearly would be more efficient to store the tracked object rather than do all this lookup
		// every update(), but this retains the original API (ie can change name of tracked object at any point)
		// so until performance is an issue I'll leave like this
		  var follows;
		if(typeof this.tracks == 'string') {
		  follows = ig.game.getEntityByName(this.tracks);
		} else if (this.tracks instanceof ig.Entity) {
		  follows = this.tracks;
		}
		
		  if ( !follows ) {
			  this.kill();
		  } else {
			  this.pos.x = follows.pos.x;
				this.pos.y = follows.pos.y;
		  }
		  
	  },
	  
	  draw: function() {
		 
		  var follows;
		if(typeof this.tracks == 'string') {
		  follows = ig.game.getEntityByName(this.tracks);
		} else if (this.tracks instanceof ig.Entity) {
		  follows = this.tracks;
		}
		 
		if ( !follows ) {
		  return;
		}
		
		this._context.save();
		this._context.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.opacity + ')';
		
		if ( this.borderColor ) {
		  this._context.strokeStyle = 'rgba(' + this.borderColor[0] + ',' + this.borderColor[1] + ',' + this.borderColor[2] + ',' + this.opacity + ')';
		  this._context.lineWidth = this.borderWidth;
		}
		
		// change by mtg101 to take account of system scale. Similar hacks should be applied to the other shapes
		var x = ig.system.scale*(this.pos.x-ig.game.screen.x-(this._bubbleWidth-follows.size.x)/(2*ig.system.scale));
		var y = ig.system.scale*(this.pos.y-ig.game.screen.y-this.margin-this._bubbleHeight/ig.system.scale);
		
		if ( this.shape == 'square' ) {
		
		  this._context.fillRect(x,y,this._bubbleWidth,this._bubbleHeight);
		  
		  if ( this.borderColor ) {
			this._context.strokeRect(x,y,this._bubbleWidth,this._bubbleHeight);
		  }
		
		} else if ( this.shape == 'rounded' ) {
		  
		  /*
		   Code to draw rectanglkes with rounded corners on HTML5 canvas by "Juan Mendes" from
		   http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
		  */
		  this._context.beginPath();
		  this._context.moveTo(x + this.radius, y);
		  this._context.lineTo(x + this._bubbleWidth - this.radius, y);
		  this._context.quadraticCurveTo(x + this._bubbleWidth, y, x + this._bubbleWidth, y + this.radius);
		  this._context.lineTo(x + this._bubbleWidth, y + this._bubbleHeight - this.radius);
		  this._context.quadraticCurveTo(x + this._bubbleWidth, y + this._bubbleHeight, x + this._bubbleWidth - this.radius, y + this._bubbleHeight);
		  this._context.lineTo(x + this.radius, y + this._bubbleHeight);
		  this._context.quadraticCurveTo(x, y + this._bubbleHeight, x, y + this._bubbleHeight - this.radius);
		  this._context.lineTo(x, y + this.radius);
		  this._context.quadraticCurveTo(x, y, x + this.radius, y);
		  this._context.closePath();
		  
		  this._context.fill();
		  
		  if ( this.borderColor ) {
			this._context.stroke();
		  }
		  
		} else if ( this.shape == 'oval' ) {
		  
		  /*
		   Code to draw ovals on HTML5 canvas by "Steve Tranby" from
		   http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
		  */
		  
		  var kappa = .5522848;
		  ox = (this._bubbleWidth / 2) * kappa, // control point offset horizontal
		  oy = (this._bubbleHeight / 2) * kappa, // control point offset vertical
		  xe = x + this._bubbleWidth,           // x-end
		  ye = y + this._bubbleHeight,           // y-end
		  xm = x + this._bubbleWidth / 2,       // x-middle
		  ym = y + this._bubbleHeight / 2;       // y-middle
	 
		  this._context.beginPath();
		  this._context.moveTo(x, ym);
		  this._context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		  this._context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		  this._context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		  this._context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		  this._context.closePath();
		   
		  this._context.fill();
		  
		  if ( this.borderColor ) {
			this._context.stroke();
		  }
		  
		}
		
		if ( !(this.font instanceof ig.Font) ) {
		
		  this._context.textAlign = 'left';  
		  this._context.fillStyle = 'rgb(' + this.fontColor[0] + ',' + this.fontColor[1] + ',' + this.fontColor[2] + ')';
		  
		  var textHeight = this.determineFontHeight();
		  
		  this._context.fillText(this.text,x+this.padding,y+textHeight+this.padding-textHeight/4);
		  this._context.restore();
		
		} else {
		
		  this._context.restore();				
		  
		  var textHeight = this.font.heightForString(this.text);
				 
		  this.font.draw( this.text, x+this.padding, y+textHeight-this.padding-textHeight/4 );
		  
		}
	},
	  
	  hexToRgb: function( hex ) {
		  var parseHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			  return [parseInt(parseHex[1], 16),parseInt(parseHex[2], 16),parseInt(parseHex[3], 16)];
	  },
	  
	  /* Method to calculate the height of text on canvas by "ellisbben" from
		   http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
	  */
	  
	  determineFontHeight: function() {
			var body = document.getElementsByTagName("body")[0];
			var dummy = document.createElement("div");
			var dummyText = document.createTextNode(this.text);
			dummy.appendChild(dummyText);
			dummy.setAttribute("style", 'font-family:' + this.font + ';font-size:' + this.fontSize + 'px');
			body.appendChild(dummy);
			var result = dummy.offsetHeight;
			body.removeChild(dummy);
			return result;
		  }
		
	});
	  
  });