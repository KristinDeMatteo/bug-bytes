export default class MoveRightState
{
	constructor(player)
	{
		this.player = player
	}

	enter({maxSpeed, accelTime, ease})
	{
		this.player.anims.play('right')

		var speedPercent = (maxSpeed - this.player.body.velocity.x) / maxSpeed;
        this.player.scene.tweens.killTweensOf(this.player.body.velocity);
        this.player.scene.tweens.add({
            targets: this.player.body.velocity,
            props: { x: { value: maxSpeed} },
            duration: accelTime * speedPercent,
            ease: ease,
            repeat: 0,
            yoyo: false,
        });
	}
}