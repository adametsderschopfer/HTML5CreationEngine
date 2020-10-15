import DisplayObject from "./core/DisplayObject";

class ClickbleElements {
  constructor(mouse) {
    this.mouse = mouse;

    this.handlers = [];
  }

  add(element, handler) {
    if (typeof handler === "function" || typeof handler === "object") {
      if (element && element instanceof DisplayObject) {
        this.handlers.push({ element, handler });
      } else {
        return console.error(
          new SyntaxError("Element should be implements DisplayObject!")
        );
      }
    }
  }

  isInside(elem, point) {
    const tops = [point.x + point.width, point.y + point.height];
    const bodyX = tops[0];
    const bodyY = tops[1];

    return (
      elem.offsetX >= point.x &&
      elem.offsetX <= bodyX &&
      elem.offsetY >= point.y &&
      elem.offsetY <= bodyY
    );
  }

  tracking() {
    for (let obj of this.handlers) {
      const { element, handler } = obj;
      const { mousedown, mouseup, mousemove } = this.mouse.keysEvent;

      // do math
      if (typeof handler === "object") {
        if (handler.hasOwnProperty("mousedown")) {
          if (this.isInside(mousedown, element)) {
            handler.mousedown();
          }
        }

        if (handler.hasOwnProperty("mouseup")) {
          if (this.isInside(mouseup, element)) {
            handler.mouseup();
          }
        }

        if (handler.hasOwnProperty("mousemove")) {
          if (this.isInside(mousemove, element)) {
            handler.mousemove();
          }
        }
      } else if (typeof handler === "function") {
        if (this.isInside(mousedown, element)) {
          handler();
        }
      }

      this.mouse.keysEvent.mousedown = {};
      this.mouse.keysEvent.mouseup = {};
    }
  }
}

export default ClickbleElements;
