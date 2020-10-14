(() => {
  "use strict";

  class Game {
    constructor(args = {}) {
      this.renderer = new GameEngine.Renderer(args);
      this.loader = new GameEngine.Loader();
      this.scenesCollection = new GameEngine.Container();
      this.primitives = new GameEngine.Primitives();

      // TODO: change, when to use with webpack
      this.store = {};

      this.devices = {
        keyboard: new GameEngine.Keyboard(args.extendKeyboardKeys || {}),
        mouse: new GameEngine.Mouse(this.renderer.canvas),
      };

      if (args.scenes) {
        this.addScenes(...args.scenes);
      }

      if (args.el && args.el.appendChild) {
        args.el.appendChild(this.renderer.canvas);
      }

      for (const scene of this.scenes) {
        scene.primitives = this.primitives;
      }

      const autoStartedScenes = this.scenes.filter((x) => x.autoStart);

      for (const scene of autoStartedScenes) {
        scene.status = "loading";
        scene.loading(this.loader);
      }

      this.loader.load(() => {
        for (const scene of autoStartedScenes) {
          scene.status = "initialization";
          scene.init(this.primitives);
        }

        for (const scene of autoStartedScenes) {
          scene.status = "started";
        }
      });

      requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    addScenes(...scenes) {
      this.scenesCollection.add(...scenes);

      scenes.forEach((scene) => {
        scene.parent = this;
      });
    }

    get scenes() {
      return this.scenesCollection.displayObjects;
    }

    tick(timestamp) {
      const startedScenes = this.scenes.filter((x) => x.status === "started");

      for (const scene of startedScenes) {
        scene.update(timestamp);
      }

      for (const scene of startedScenes) {
        scene.tick(timestamp);
      }

      this.renderer.clear();

      for (const scene of startedScenes) {
        scene.draw(this.renderer.canvas, this.renderer.ctx);
      }

      requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    getScene(name) {
      if (name instanceof GameEngine.Scene) {
        if (this.scenes.includes(name)) {
          return name;
        }
      }

      if (typeof name === "string") {
        for (const sceneItem of this.scenes) {
          if (sceneItem.name === name) {
            return sceneItem;
          }
        }
      }
    }

    startScene(name) {
      const scene = this.getScene(name);

      if (!scene) {
        return false;
      }

      scene.status = "loading";
      scene.loading(this.loader);

      this.loader.load(() => {
        scene.status = "initialization";
        scene.init();

        scene.status = "started";
      });

      return true;
    }

    finishScene(name) {
      const scene = this.getScene(name);

      if (!scene) {
        return false;
      }

      scene.status = "Finished";
      this.scenesCollection.remove(scene);
      scene.beforeDestroy();

      return true;
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Game = Game;
})();
