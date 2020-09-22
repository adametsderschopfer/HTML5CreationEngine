(() => {
  "use strict";

  class Game {
    constructor(args = {}) {
      this.width = args.width || {};
      this.height = args.height | {};
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Game = Game;
})();
