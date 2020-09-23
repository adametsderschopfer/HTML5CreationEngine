(() => {
  "use strict";

  class Game {
    constructor(args = {}) {
      this.renderer = new GameEngine.Renderer(args);

      if (args.el && args.el.appendChild) {
        args.el.appendChild(this.renderer.canvas);
      }
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Game = Game;
})();
