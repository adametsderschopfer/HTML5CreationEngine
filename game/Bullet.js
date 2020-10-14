class Bullet extends GameEngine.Body {
  constructor(originalArgs = {}) {
    const args = Object.assign({}, originalArgs);

    super(Bullet.texture, args);

    this.bullets = [];

    this.tank = null;

    this.setFramesCollection(Bullet.atlas.frames);
    this.setAnimationsCollection(Bullet.atlas.actions);

    this.on("collision", (a, b) => {
      if (a === this.tank) {
        return;
      }

      if (a.isEnemy && blur.isEnemy) {
        return;
      }

      this.toDestroy = true;
    });
  }
}

Bullet.texture = null;
Bullet.atlas = null;

Bullet.NORMAL_SPEED = 5;
Bullet.BULLET_TIMEOUT = 1000;
