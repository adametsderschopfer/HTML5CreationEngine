(function () {
  class Camera {
    constructor(args = {}) {
      this.x = args.x || 0;
      this.y = args.y || 0;
      this.width = args.width || 640;
      this.height = args.height || 640;
      this.limitX = args.limitX || 50000;
      this.limitY = args.limitY || 50000;

      this.watchObject = false;
      this.obj = null;

      this.scrollEdge = args.scrollEdge || 200;
    }

    watch(obj) {
      this.watchObject = true;
      this.obj = obj;
    }

    update() {
      if (this.watchObject) {
        if (this.obj.x > this.x + this.width - this.scrollEdge) {
          this.x = Math.min(
            this.limitX,
            this.obj.x - this.width + this.scrollEdge
          );
        }

        if (this.obj.x < this.x + this.scrollEdge) {
          this.x = Math.max(0, this.obj.x - this.scrollEdge);
        }

        if (this.obj.y > this.y + this.height - this.scrollEdge) {
          this.y = Math.min(
            this.limitY,
            this.obj.y - this.height + this.scrollEdge
          );
        }

        if (this.obj.y < this.y + this.scrollEdge) {
          this.y = Math.max(0, this.obj.y - this.scrollEdge);
        }
      }
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Camera = Camera;
})();
