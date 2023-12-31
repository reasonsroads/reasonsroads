ig.module( 'game.levels.dorm2' )
.requires( 'impact.image','game.entities.levelexit','game.entities.zombie3','game.entities.trigger','game.entities.message','game.entities.chatbubble','game.entities.spawner_zombie','game.entities.player' )
.defines(function(){
LevelDorm2=/*JSON[*/{
	"name": 2,
	"entities": [
		{
			"type": "EntityLevelexit",
			"x": 156,
			"y": 112,
			"settings": {
				"level": "level_3"
			}
		},
		{
			"type": "EntityLevelexit",
			"x": 16,
			"y": 100,
			"settings": {
				"level": "dorm1"
			}
		},
		{
			"type": "EntityZombie3",
			"x": 204,
			"y": 18,
			"settings": {
				"name": "d3"
			}
		},
		{
			"type": "EntityTrigger",
			"x": 64,
			"y": 56,
			"settings": {
				"target": {
					"1": "d1"
				}
			}
		},
		{
			"type": "EntityTrigger",
			"x": 112,
			"y": 56,
			"settings": {
				"target": {
					"2": "chat"
				}
			}
		},
		{
			"type": "EntityMessage",
			"x": 192,
			"y": 120,
			"settings": {
				"size": {
					"x": 24,
					"y": 16
				},
				"message": "hellooo"
			}
		},
		{
			"type": "EntityMessage",
			"x": 144,
			"y": 72,
			"settings": {
				"size": {
					"x": 24,
					"y": 16
				},
				"message": "yuh",
				"target": "message"
			}
		},
		{
			"type": "EntityChatbubble",
			"x": 8,
			"y": 132,
			"settings": {
				"name": "none"
			}
		},
		{
			"type": "EntitySpawner_zombie",
			"x": 68,
			"y": 40,
			"settings": {
				"name": "d1"
			}
		},
		{
			"type": "EntityPlayer",
			"x": 36,
			"y": 106
		}
	],
	"layer": [
		{
			"name": "new_layer_0",
			"width": 30,
			"height": 20,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/dorm-tiles.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 8,
			"foreground": false,
			"data": [
				[1,2,2,13,14,13,13,14,13,14,14,13,14,14,13,13,14,14,13,14,14,14,12,13,13,14,14,14,14,2],
				[1,2,26,37,38,37,37,38,13,13,14,37,38,38,37,37,13,14,13,14,13,14,12,37,13,14,14,38,38,2],
				[1,2,26,13,14,14,37,13,37,13,13,13,14,37,37,37,37,13,14,13,14,14,12,37,37,38,38,14,38,2],
				[1,2,26,13,14,38,14,14,37,37,37,37,13,13,13,13,13,14,38,13,14,13,12,14,13,13,14,38,1,2],
				[1,2,26,13,13,14,38,38,37,38,38,38,37,37,37,13,14,38,14,13,13,37,12,14,37,13,14,38,1,2],
				[1,2,26,37,13,14,37,38,14,14,14,14,14,14,14,14,14,38,14,37,37,37,12,14,37,13,14,38,1,2],
				[1,2,13,13,13,13,14,38,38,38,38,38,14,14,38,38,38,13,14,13,37,38,12,14,38,13,14,38,1,2],
				[1,2,37,37,37,13,13,14,21,22,37,14,14,14,21,22,38,13,14,37,37,38,14,12,12,12,12,12,12,12],
				[25,1,2,13,14,14,13,37,45,46,37,38,38,38,45,46,38,14,14,37,38,14,13,14,13,14,38,25,1,2],
				[25,1,2,13,14,38,14,37,38,37,13,37,37,37,13,13,13,14,11,11,11,37,37,38,13,14,38,14,1,2],
				[1,2,26,13,14,37,38,37,38,37,13,21,22,37,13,13,13,13,11,11,11,37,37,13,14,14,38,38,1,2],
				[1,2,13,14,23,24,38,37,38,37,13,45,46,37,13,13,37,37,37,23,24,37,38,14,14,38,37,38,1,2],
				[1,2,13,13,47,48,38,14,23,24,13,23,24,14,23,24,37,13,14,47,48,38,37,38,14,37,37,38,1,2],
				[1,2,37,13,71,72,13,37,37,37,13,13,37,38,37,38,14,13,13,71,72,13,13,13,14,37,38,1,2,2],
				[25,1,2,37,95,96,37,13,13,14,37,13,13,13,13,37,38,37,37,95,96,37,37,37,14,37,38,1,1,2],
				[25,1,2,2,2,2,2,37,37,38,37,37,37,37,37,37,38,2,2,2,2,2,2,2,14,14,14,2,1,2],
				[1,2,2,26,26,26,26,2,37,38,38,2,2,2,2,2,2,2,26,26,26,26,26,26,14,14,14,26,1,2],
				[1,2,26,26,25,26,25,26,26,26,26,26,26,26,26,26,26,26,25,1,1,1,1,2,25,25,25,1,1,2],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,25,1,2],
				[25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26]
			]
		},
		{
			"name": "collision",
			"width": 30,
			"height": 20,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 8,
			"foreground": false,
			"data": [
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,12,12,0,12,12,0,12,12,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
				[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1],
				[1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			]
		}
	]
}/*]JSON*/;
LevelDorm2Resources=[new ig.Image('media/dorm-tiles.png')];
});