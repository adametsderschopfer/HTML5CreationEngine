const DELEY_COLLECTION = {};
const UIDS = [];

const Util = {};

Util.delay = function delay(name, timeoff = 0) {
  if (!DELEY_COLLECTION[name]) {
    DELEY_COLLECTION[name] = Date.now();

    return true;
  }
  if (DELEY_COLLECTION[name] + timeoff > Date.now()) {
    return false;
  }

  DELEY_COLLECTION[name] = Date.now();

  return true;
};

Util.generateUid = function generateUid(size = 12) {
  let uid = getRandomString(size);

  let punctured = "";
  let isPunctured = false;

  while (UIDS.includes(uid)) {
    uid = getRandomString(size);
  }

  if (uid.length >= 8) {
    isPunctured = true;

    for (let i = 0; i < uid.length; i++) {
      let j = i / 4;
      if (!isFloat(j) && j !== 0) {
        punctured += "-";
      }

      punctured += uid[i];
    }
  }

  return isPunctured ? punctured : uid;
};

Util.isInside = function isInside(point, rect) {
  return (
    rect.x <= point.x &&
    point.x <= rect.x + rect.width &&
    rect.y <= point.y &&
    point.y <= rect.y + rect.height
  );
};

Util.removeElements = function removeElements(array, ...elements) {
  for (const i of array) {
    if (array.includes(i)) {
      const idx = array.indexOf(i);

      array.splice(idx, 1);
    }
  }
};

Util.getScene = function getScene(obj) {
  if (!obj || obj instanceof GameEngine.Scene) {
    return obj;
  }

  return Util.getScene(obj.parent);
};

Util.tween = function tween(params) {
  let { target, duration, processer } = params;

  if (!target) {
    throw new Error("Tween without target object.");
  }

  let createAt = Date.now();
  let context = {};
  let stopped = false;

  let tweenFunction = () => {
    const percent = Math.min((Date.now() - createAt) / duration, 1);
    processer(target, percent, context);

    if (percent >= 1) {
      stopped = true;
      context = null;
      target = null;
      processer = null;
      tweenFunction = null;
      clearInterval(intervalFlag);
    }
  };

  tweenFunction();

  const intervalFlag = setInterval(tweenFunction);

  return () => {
    if (stopped) {
      return;
    }

    stopped = true;
    context = null;
    target = null;
    processer = null;
    tweenFunction = null;
    clearInterval(intervalFlag);
  };
};

Util.getRandomFrom = function getRandomFrom(...array) {
  return array[Math.floor(Math.random() * array.length)];
};

const alphabet = "qwertyuiopasdfghjklzxcvbnm1234567890";

function getRandomLetter() {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function getRandomString(size = 15) {
  let str = "";

  while (str.length < +size) {
    str += getRandomLetter();
  }

  return str;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export { isFloat, getRandomLetter, getRandomString };

export default Util;
