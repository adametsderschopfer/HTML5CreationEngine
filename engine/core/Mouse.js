(function () {
  class Mouse {
    constructor(el) {
      this.keysEvent = {
        mousedown: {},
        mouseup: {},
        contextmenu: {},
        mousemove: {},
      };

      Object.keys(this.keysEvent).forEach((_eventName) =>
        el.addEventListener(_eventName.toString(), (event) =>
          this.mouseEventHandler.bind(this)(event, _eventName)
        )
      );
    }

    mouseEventHandler(event, _eventName) {
      this.keysEvent[_eventName] = event;
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Mouse = Mouse;
})();
