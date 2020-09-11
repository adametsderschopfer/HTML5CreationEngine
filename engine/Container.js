(function () {
  "use strict";

  class Container {
    constructor() {
      this.dispalyObjects = [];
    }

    add(dispalyObject) {
      if (!this.dispalyObjects.includes(dispalyObject)) {
        this.dispalyObjects.push(dispalyObject);
      }
    }

    remove() {}

    draw(canvas, context) {
      for (let dispalyObject of this.dispalyObjects) {
        dispalyObject.draw(canvas, context);
      }
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Container = Container;
})();
