// let sprite = null;
// let sprite2 = null;
const { Scene, Game, Body, ArcadePhysics } = GameEngine;
const DEBUG_MODE = true;

const mainScene = new Scene({
  name: "mainScene",
  autoStart: true,

  loading(loader) {
    loader.addJson("Atlas", "static/atlas.json");
    loader.addImage("spriteSheet", "static/spriteSheet.png");
  },

  init() {
    Tank.texture = this.parent.loader.getImage("spriteSheet");
    Tank.atlas = this.parent.loader.getJson("Atlas");

    Bullet.texture = this.parent.loader.getImage("spriteSheet");
    Bullet.atlas = this.parent.loader.getJson("Atlas");

    this.arcadePhysics = new ArcadePhysics();

    this.tank = new Tank({
      x: 150,
      y: 150,
      debug: DEBUG_MODE,
    });

    this.lorem = this.primitives.create("Text", {
      x: 250,
      y: 250,
      text: "Loreasdasdasdasdm",

      anchorX: 0.5,
      anchorY: 0.5,
    });

    this.add(this.lorem);
    // this.arcadePhysics.add(this.tank);
  },
  update() {
    this.tank.movementUpdate(this.parent.devices.keyboard);

    this.arcadePhysics.processing();
  },
});

const game = new Game({
  el: document.body,
  width: 600,
  height: 600,
  background: "#ccc",
  scenes: [mainScene],
  // extendKeyboardKeys,
});
