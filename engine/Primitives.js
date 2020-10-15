import DisplayObject from "./core/DisplayObject";

class Circle extends DisplayObject {
  constructor(args = {}) {
    super(args);

    this.color = args.color || "red";
    this.radius = args.radius || 5;
    this.startAngle = args.startAngle || 0;
    this.endAngle = args.endAngle || Math.PI * 2;
    this.anticlockwise = args.anticlockwise || false;
    this.lineWidth = args.lineWidth || 1;
    this.isFill = args.isFill || false;
  }

  draw(_, ctx) {
    super.draw(() => {
      ctx.fillStyle = ctx.strokeStyle = this.color;
      ctx.lineWidth = this.lineWidth;
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.radius,
        this.startAngle,
        this.endAngle,
        this.anticlockwise
      );
      this.isFill ? ctx.fill() : ctx.stroke();
    });
  }
}

class Line extends DisplayObject {
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

class Square extends DisplayObject {
  constructor(args = {}) {
    super(args);

    this.color = args.color || "red";
    this.lineWidth = args.lineWidth || 1;

    this.x = args.x || 0;
    this.y = args.y || 0;

    this.width = args.width || 50;
    this.height = args.height || 50;

    this.isFill = args.isFill || false;
  }

  draw(_, ctx) {
    super.draw(() => {
      ctx.fillStyle = ctx.strokeStyle = this.color;
      ctx.lineWidth = this.lineWidth;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      this.isFill ? ctx.fill() : ctx.stroke();
    });
  }
}

class Text extends DisplayObject {
  constructor(args = {}) {
    super(args);

    this.x = args.x || 0;
    this.y = args.y || 0;

    this.color = args.color || "red";

    this.fontSize = args.fontSize || 16;
    this.fontFamily = args.fontFamily || "serif";

    this.text = args.text || " ";
    this.isFill = args.isFill || true;
  }

  draw(_, ctx) {
    super.draw(() => {
      ctx.fillStyle = ctx.strokeStyle = this.color;
      ctx.font = `${this.fontSize.toString()}px ${this.fontFamily}`;
      ctx.beginPath();
      this.isFill
        ? ctx.fillText(this.text, this.x, this.y)
        : ctx.strokeText(this.text, this.x, this.y);
    });
  }
}

class Primitives {
  static list = {
    Line,
    Circle,
    Square,
    Text,
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

export default Primitives;
