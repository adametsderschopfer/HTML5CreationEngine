(() => {
  "use strict";

  class DisplayObject extends GameEngine.EventEmitter {
    constructor(args = {}) {
      super();

      this.uid = GameEngine.Util.generateUid(args.uid);

      this.x = args.x || 0;
      this.y = args.y || 0;

      this.anchorX = args.anchorX || 0;
      this.anchorY = args.anchorY || 0;

      this.width = args.width || 0;
      this.height = args.height || 0;

      this.rotation = args.rotation || 0;

      this.scale = args.scale || 1;

      this.scaleX = args.scaleX || 1;
      this.scaleY = args.scaleY || 1;

      this.parent = null;
      this.visible = true;

      if (args.scale !== undefined) {
        this.setScale(args.scale);
      }
    }

    get absoluteX() {
      return this.x - this.anchorX * this.width * this.scaleX;
    }

    set absoluteX(value) {
      this.x = value + this.anchorX * this.width * this.scaleX;
      return value;
    }

    get absoluteY() {
      return this.y - this.anchorY * this.height * this.scaleY;
    }

    set absoluteY(value) {
      this.y = value + this.anchorY * this.height * this.scaleY;
      return value;
    }

    setScale(scale) {
      this.scaleX = scale;
      this.scaleY = scale;
    }

    setParent(parent) {
      if (this.parent && this.parent.remove) {
        this.parent.remove(this);
      }

      if (parent && parent.add) {
        parent.add(this);
      }

      this.parent = parent;
    }

    draw(callback) {
      if (this.visible) {
        callback();
        return;
      }

      return;
    }
  }
  window.GameEngine = window.GameEngine || {};
  window.GameEngine.DisplayObject = DisplayObject;
})();
