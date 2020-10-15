import Renderer from "./Renderer";
import Loader from "./core/Loader";
import Container from "./Container";
import Primitives from "./Primitives";
import Keyboard from "./core/Keyboard";
import Mouse from "./core/Mouse";
import Scene from "./Scene";

import { createStore } from "./core/Store/Store";
import ClickbleElements from "./ClickbleElements";

class Game {
  constructor(args = {}) {
    this.renderer = new Renderer(args);
    this.loader = new Loader();
    this.scenesCollection = new Container();
    this.primitives = new Primitives();

    this.devices = {
      keyboard: new Keyboard(args.extendKeyboardKeys || {}),
      mouse: new Mouse(this.renderer.canvas),
    };

    this.clickbelElements = new ClickbleElements(this.devices.mouse);

    this.store = createStore(args.reducer, args.initialState);

    if (args.scenes) {
      this.addScenes(...args.scenes);
    }

    if (args.el && args.el.appendChild) {
      args.el.appendChild(this.renderer.canvas);
    }

    for (const scene of this.scenes) {
      scene.primitives = this.primitives;
      scene.clickbelElements = this.clickbelElements;
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
    if (name instanceof Scene) {
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

export default Game;
