(function () {
  "use strict";

  class Sprite extends GameEngine.DisplayObject {
    constructor(texture, args = {}) {
      super(args);

      const frame = args.frame || {};
      const velocity = args.velocity || {};
      this.keysDefault = args.keysDefault || []

      this.texture = texture;

      this.frame = {
        x: frame.x || 0,
        y: frame.y || 0,
        width: frame.width || texture.width,
        height: frame.height || texture.height,
      };
      this.frameDelay = 0;
      this.frames = [];
      this.frameNumber = 0;

      this.animations = {};
      this.animation = "";

      this.velocity = {
        x: velocity.x || 0,
        y: velocity.y || 0,
      };

      if (args.width === undefined) {
        this.width = this.frame.width;
      }

      if (args.height === undefined) {
        this.height = this.frame.height;
      }
    }

    setFramesCollection(framesCollection) {
      this.frames = framesCollection;
    }

    setAnimationsCollection(animationsCollection) {
      this.animations = animationsCollection;
    }

    startAnimation(name) {
      if (!this.animations.hasOwnProperty(name)) {
        return false;
      }

      const { duration = Infinity, keys } = this.animations[name];

      this.animation = name;

      this.frameDelay = duration / keys.length;
      this.setFrameByKeys(...keys[0]);
    }

    setFrameByKeys(...keys) {
      const frame = this.getFrameByKeys(...keys, ...this.keysDefault);

      if (!frame) {
        return false;
      }

      this.frame.x = frame.x;
      this.frame.y = frame.y;
      this.frame.width = frame.width;
      this.frame.height = frame.height;

      this.width = this.frame.width;
      this.height = this.frame.height;
    }

    getFrameByKeys(...keys) {
      let flag = false;

      for (const frame of this.frames) {
        flag = true;

        for (const key of keys) {
          if (!frame.keys.includes(key)) {
            flag = false;
            break;
          }
        }

        if (flag) {
          return frame;
        }
      }
    }

    tick() {
      if (
        this.animation &&
        GameEngine.Util.delay(this.animation + this.uid, this.frameDelay)
      ) {
        const { keys } = this.animations[this.animation];

        this.frameNumber = (this.frameNumber + 1) % keys.length;
        this.setFrameByKeys(...keys[this.frameNumber]);
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }

    draw(_, context) {
      super.draw(() => {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.rotation);
        // context.scale(this.scaleX, this.scaleY)

        if (this.texture) {
          context.drawImage(
            this.texture,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            this.absoluteX - this.x,
            this.absoluteY - this.y,
            this.width * this.scaleX,
            this.height * this.scaleY
          );
        }

        context.restore();
      });
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Sprite = Sprite;
})();
