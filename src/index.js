import Phaser from 'phaser';
import PlayerController from './PlayerController';
import dudeImg from './assets/dude.png';
import groundImg from './assets/platform.png';
import skyImg from './assets/sky.png';
import bgImg1 from './assets/level_1_bg_1.png';
import bgImg2 from './assets/level_1_bg_2.png';
import invisWall from './assets/leftBorder.png';
import mainHelloWorld from './assets/mainHelloWorld.png';
import mainHelloWorldBubble from './assets/mainHelloWorldBubble.png';

class Level extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('sky', skyImg);
        this.load.image('ground', groundImg);
        this.load.spritesheet('dude', dudeImg, { frameWidth: 32, frameHeight: 48 });
        this.load.image('bg1', bgImg1);
        this.load.image('bg2', bgImg2);
        this.load.image('invisWall', invisWall);
        this.load.image('mainHelloWorld', mainHelloWorld);
        this.load.image('mainHelloWorldBubble', mainHelloWorldBubble);
    }
      
    create ()
    {
        //  Set the camera and physics bounds
        this.cameras.main.setBounds(0, 0, 800, 1129 * 2);
        this.physics.world.setBounds(0, 0, 800, 1129 * 2);   
        
        this.add.image(0, 0, 'bg1').setOrigin(0);
        // 1129 is the height of first bg image
        this.add.image(0, 1129, 'bg2').setOrigin(0);

        this.invisWall = this.physics.add.staticGroup();
        this.invisWall.create(0, 0, 'invisWall').setOrigin(0).refreshBody();
        
        this.platforms = this.physics.add.staticGroup();
        this.deadlyPlatform = this.physics.add.staticGroup();

        //this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        //This is the deadly platform (for spikes)
        this.platforms.create(75, 220, 'mainHelloWorld').setOrigin(0).refreshBody();
        this.platforms.create(475, 500, 'mainHelloWorldBubble').refreshBody();

        
        //this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 45, 'dude');
        // this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player);
        
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.invisWall);

        this.physics.add.collider(this.player, this.deadlyPlatform, function() {
            this.scene.restart();
        });


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.playerController = new PlayerController(this.player);
        this.playerController.setState('idle');

        /*
        let movingPlatform = this.physics.add.image(330, 600, 'ground').setScale(0.25)
        .setImmovable(true)
        .setVelocity(100, -100)

        movingPlatform.body.setAllowGravity(false)

        this.tweens.timeline({
        targets: movingPlatform.body.velocity,
        loop: -1,
        tweens: [
            { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
            { x:    0, y: 200, duration: 2000, ease: 'Stepped' },
        ]
        });

        this.physics.add.collider(movingPlatform, this.player)
        */
    }

    update() 
    {
        if (this.cursors.left.isDown) {
            this.playerController.setState('moveLeft');
        }
        else if (this.cursors.right.isDown) {
            this.playerController.setState('moveRight');
        } else {
            this.playerController.setState('idle');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-400);
        }
        
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Level,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
