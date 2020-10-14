/**
 * @module Renderer
 */

(function () {
  "use strict";

  class Renderer {
    constructor(args = {}) {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
  
      this.canvas.width = args.width || 50;
      this.canvas.height = args.height || 50;
      this.background = args.background || "black";
      this.canvasStyle = args.canvasStyle || {};

      Object.keys(this.canvasStyle).forEach((key) => {
        if (typeof this.canvasStyle[key] === "number") {
          this.canvasStyle[key] = String(this.canvasStyle[key] + "px");
        }

        this.canvas.style[key] = this.canvasStyle[key];
      });

    }

    // get displayObjects() {
    //   return _getDisplayObjects(this.stage);

    //   function _getDisplayObjects(container, result = []) {
    //     for (const displayObject of container.displayObjects) {
    //       if (displayObject instanceof GameEngine.Container) {
    //         _getDisplayObjects(displayObject, result);
    //       } else {
    //         return result.push(displayObject);
    //       }
    //     }
    //   }
    // }


    // render() {
    //   this.stage.draw(this.canvas, this.ctx);
    // }

    clear() {
      this.ctx.fillStyle = this.background;
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fill();
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Renderer = Renderer;
})();
