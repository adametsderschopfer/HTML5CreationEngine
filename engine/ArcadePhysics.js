import Util from "./Util";

class ArcadePhysics {
  constructor() {
    this.objects = new Set();
  }

  add(...displayObjects) {
    for (const obj of displayObjects) {
      this.objects.add(obj);
    }
  }

  remove(...displayObjects) {
    for (const obj of displayObjects) {
      this.objects.delete(obj);
    }
  }

  processing() {
    const displayObjects = Array.from(this.objects);

    for (let i = 0; i < displayObjects.length - 1; i++) {
      const a = displayObjects[i];
      const bodyA = a.bodyRect;
      const topsA = a.tops;
      const vxA = a.velocity.x;
      const vyA = a.velocity.y;

      for (let j = i + 1; j < displayObjects.length; j++) {
        const b = displayObjects[j];

        const bodyB = b.bodyRect;
        const topsB = b.tops;
        const vxB = b.velocity.x;
        const vyB = b.velocity.y;

        if (a.static && b.static) {
          continue;
        }

        let crossing = false;

        for (const topA of topsA) {
          crossing = Util.isInside(
            {
              x: topA[0] + vxA,
              y: topA[1] + vyA,
            },
            {
              x: bodyB.x + vxB,
              y: bodyB.y + vyB,
              width: bodyB.width,
              height: bodyB.height,
            }
          );

          if (crossing) {
            break;
          }
        }

        if (crossing === false) {
          for (const topB of topsB) {
            crossing = Util.isInside(
              {
                x: topB[0] + vxB,
                y: topB[1] + vyB,
              },
              {
                x: bodyA.x + vxA,
                y: bodyA.y + vyA,
                width: bodyA.width,
                height: bodyA.height,
              }
            );

            if (crossing) {
              break;
            }
          }
        }

        if (crossing) {
          a.emit("collision", a, b);
          b.emit("collision", b, a);
        }
      }
    }
  }
}

export default ArcadePhysics;
