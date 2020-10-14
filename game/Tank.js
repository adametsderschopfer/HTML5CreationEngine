class Tank extends GameEngine.Body {
  constructor(originalArgs = {}) {
    const args = Object.assign(
      {
        scale: 3.5,
      },
      originalArgs
    );

    super(Tank.texture, args);

    this.bullets = [];

    this.setFramesCollection(Tank.atlas.frames);
    this.setAnimationsCollection(Tank.atlas.actions);
    this.startAnimation("moveUp");

    this.on("collision", (a, b) => this.collisionHandler(a, b));
  }

  collisionHandler(a, b) {
    if (a instanceof Bullet) {
      if (this.bullets.includes(a)) {
        return;
      } else {
        this.scene.arcadePhysics.remove(this);
        this.scene.remove(this);
      }
    }

    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  movementUpdate(keyboard) {
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (keyboard.keys.arrowLeft) {
      this.velocity.x = -Tank.NORMAL_SPEED;
    } else if (keyboard.keys.arrowRight) {
      this.velocity.x = +Tank.NORMAL_SPEED;
    } else if (keyboard.keys.arrowDown) {
      this.velocity.y = +Tank.NORMAL_SPEED;
    } else if (keyboard.keys.arrowUp) {
      this.velocity.y = -Tank.NORMAL_SPEED;
    }

    if (
      keyboard.keys.space &&
      GameEngine.Util.delay("tank" + this.uid, Bullet.BULLET_TIMEOUT)
    ) {
      const bullet = new Bullet({
        x: this.x,
        y: this.y,
        debug: DEBUG_MODE,
      });

      this.bullets.push(bullet);
      bullet.tank = this;
      if (this.animation === "moveUp") {
        bullet.velocity.y -= Bullet.NORMAL_SPEED;
        bullet.setFrameByKeys("bullet", "up");
      }

      this.parent.add(bullet);
      this.parent.arcadePhysics.add(bullet);
    }
  }

  setDirect() {}
}

Tank.texture = null;
Tank.atlas = null;

Tank.NORMAL_SPEED = 2;
Tank.BULLET_TIMEOUT = 1000;
