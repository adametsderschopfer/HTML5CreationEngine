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
      this.update = args.update || function () {};
      this.canvasStyle = args.canvasStyle || {};
      this.background = args.background || "black";

      Object.keys(this.canvasStyle).forEach((key) => {
        if (typeof this.canvasStyle[key] === "number") {
          this.canvasStyle[key] = String(this.canvasStyle[key] + "px");
        }

        this.canvas.style[key] = this.canvasStyle[key];
      });

      this.stage = new GameEngine.Container();

      requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    get dispalyObjects() {
      return this.stage.dispalyObjects;
    }

    tick(timestamp) {
      this.update(timestamp);
      this.clear();
      this.render();

      requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    render() {
      this.stage.draw(this.canvas, this.ctx);
    }

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
