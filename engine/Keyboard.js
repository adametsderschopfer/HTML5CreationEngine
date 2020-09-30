(function () {
  class Keyboard {
    _self = this;

    constructor(extendKeyboardKeys = {}) {
      this.keys = {
        arrowUp: false,
        arrowDown: false,
        arrowLeft: false,
        arrowRight: false,
        space: false,
        escape: false,
        enter: false,

        ...extendKeyboardKeys.keys,
      };

      this.keyEvent.bind(this);

      this.keysAction = {
        ArrowUp: (bool) => {
          this.keys.arrowUp = bool;
        },
        ArrowDown: (bool) => {
          this.keys.arrowDown = bool;
        },
        ArrowLeft: (bool) => {
          this.keys.arrowLeft = bool;
        },
        ArrowRight: (bool) => {
          this.keys.arrowRight = bool;
        },
        Space(bool) {
          this.keys.space = bool;
        },
        Escape(bool) {
          this.keys.escape = bool;
        },
        Enter(bool) {
          this.keys.enter = bool;
        },

        ...extendKeyboardKeys.actions,
      };

      document.body.addEventListener("keydown", (e) => {
        this.keyEvent(e, true);
      });

      document.body.addEventListener("keyup", (e) => {
        this.keyEvent(e, false);
      });
    }

    keyEvent(event, bool) {
      if (
        this.keysAction[event.code] &&
        typeof this.keysAction[event.code] === "function"
      ) {
        this.keysAction[event.code].bind(this)(bool, this._self);
        return;
      }
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Keyboard = Keyboard;
})();
