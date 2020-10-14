(() => {
  class EventEmitter {
    constructor() {
      this.handlers = {};
    }

    on(...args) {
      this.#addEventListener(...args);
    }

    off(...args) {
      this.#removeEventListener(...args);
    }

    #addEventListener(name, handler) {
      if (!this.handlers.hasOwnProperty(name)) {
        this.handlers[name] = [];
      }

      this.handlers[name].push(handler);
    }

    #removeEventListener(name = null, handler = null) {
      if (this.handlers.hasOwnProperty(name)) {
        delete this.handlers[name];

        return handler();
      } else {
        const _error = new SyntaxError(`Handler by name { ${name} } not found`);

        return handler(_error);
      }
    }

    emit(name, ...args) {
      if (!this.handlers.hasOwnProperty(name)) {
        return false;
      }

      for (const handler of this.handlers[name]) {
        handler(...args);
      }

      return true;
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.EventEmitter = EventEmitter;
})();
