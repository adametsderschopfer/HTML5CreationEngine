// import DisplayObject from "./DisplayObject";
(() => {
  class Point extends GameEngine.DisplayObject {
    constructor(args = {}) {
      super(args);

      this.color = args.color || "red";
      this.radius = args.radius || 5;
      this.startAngle = args.startAngle || 0;
      this.endAngle = args.endAngle || Math.PI * 2;
      this.anticlockwise = args.anticlockwise || false;
    }
    draw(_, ctx) {
      super.draw(() => {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.radius,
          this.startAngle,
          this.endAngle,
          this.anticlockwise
        );
        ctx.fill();
      });
    }
  }

  class Line extends GameEngine.DisplayObject {
    constructor(args = {}) {
      super(args);

      this.color = args.color || "red";
      this.lineWidth = args.lineWidth || 1;

      this.x1 = args.x1 || 0;
      this.y1 = args.y1 || 0;
      this.x2 = args.x2 || 0;
      this.y2 = args.y2 || 0;
    }

    draw(_, ctx) {
      super.draw(() => {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
      });
    }
  }

  class Primitives {
    static list = {
      Point,
      Line,
    };

    create(type, args) {
      if (!type) {
        return new SyntaxError("Error -> You do not entered type name.");
      }

      if (Primitives.list.hasOwnProperty(type)) {
        let Primitive = Primitives.list[type];

        const primitive = new Primitive(args);
        primitive.type = type;

        return primitive;
      } else {
        console.log(
          new TypeError(`Error -> Primitives list hasn't type ( ${type} )`)
        );

        return;
      }
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Primitives = Primitives;
})();

// export { Point, Line };
// export default Primitives;
