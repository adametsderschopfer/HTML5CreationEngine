(function () {
  "use strict";

  class Container extends GameEngine.DisplayObject {
    constructor(args = {}) {
      super(args);

      this.dispalyObjects = [];
    }

    add(dispalyObject) {
      if (!this.dispalyObjects.includes(dispalyObject)) {
        this.dispalyObjects.push(dispalyObject);
        dispalyObject.setParent(this);
      }
    }

    remove(displayObject) {
      if (this.dispalyObjects.includes(dispalyObject)) {
        const idx = this.dispalyObjects.indexOf(dispalyObject);
        this.dispalyObjects.splice(idx, 1);
        dispalyObject.setParent(null);
      }
    }

    draw(canvas, context) {
      super.draw(() => {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.scale(this.scaleX, this.scaleY);

        for (let dispalyObject of this.dispalyObjects) {
          dispalyObject.draw(canvas, context);
        }
 
        context.restore();
      });
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Container = Container;
})();
