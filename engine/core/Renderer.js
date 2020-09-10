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
      this.background = args.background || "black"

      requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    tick(timestamp) {
      this.clear()
      this.update(timestamp)

      requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    draw(callback) {
      callback(this.canvas, this.ctx)
    }

    clear () {
      this.draw((canv, ctx) => {
        ctx.fillStyle = this.background
        ctx.beginPath();
        ctx.rect(0, 0, canv.width, canv.height)
        ctx.fill()
      })
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Renderer = Renderer;
})();
