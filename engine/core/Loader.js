/**
 * @module Loader
 */

/**
 * Loader Module
 * Adding JSON or Image files for later downloading them from the server
 * To load, use the load () method of the class instance
 *
 * ------------------------------------
 *
 * Модуль загрузчика
 * Добавление JSON или Image файлов для последующей загрузки их с сервера
 * Для загрузки используем метод load() у инстенса класса
 */

class Loader {
  constructor() {
    this.loadOrder = {
      images: [],
      jsons: [],
      sounds: [],
    };

    this.resources = {
      images: {},
      jsons: {},
      sounds: {},
    };
  }

  addImage(name, src) {
    this.loadOrder.images.push({ name, src });
  }

  addJson(name, address) {
    this.loadOrder.jsons.push({ name, address });
  }
  addSound(name, src) {
    this.loadOrder.sounds.push({ name, src });
  }

  getImage(searchedName) {
    if (this.resources.images.hasOwnProperty(searchedName)) {
      return this.resources.images[searchedName];
    } else {
      return new Error("Image not found. Try to enter valid file name!\n");
    }
  }

  getJson(searchedName) {
    if (this.resources.jsons.hasOwnProperty(searchedName)) {
      return this.resources.jsons[searchedName];
    } else {
      return new Error("Json not found. Try to enter valid file name!\n");
    }
  }
  getSound(name) {
    return this.resources.sounds[name];
  }

  load(callback) {
    const promises = [];

    for (const imageData of this.loadOrder.images) {
      const { name, src } = imageData;

      const promise = Loader.loadImage(src).then((image) => {
        this.resources.images[name] = image;

        if (this.loadOrder.images.includes(imageData)) {
          const idx = this.loadOrder.images.indexOf(imageData);
          this.loadOrder.images.splice(idx, 1);
        }
      });

      promises.push(promise);
    }

    for (const jsonData of this.loadOrder.jsons) {
      const { name, address } = jsonData;

      const promise = Loader.loadJson(address).then((json) => {
        this.resources.jsons[name] = json;

        if (this.loadOrder.jsons.includes(jsonData)) {
          const idx = this.loadOrder.jsons.indexOf(jsonData);
          this.loadOrder.jsons.splice(idx, 1);
        }
      });

      promises.push(promise);
    }

    for (const soundData of this.loadOrder.sounds) {
      const { name, src } = soundData;

      const promise = Loader.loadSound(src).then((audio) => {
        this.resources.sounds[name] = audio;

        if (this.loadOrder.sounds.includes(soundData)) {
          const index = this.loadOrder.sounds.indexOf(soundData);
          this.loadOrder.sounds.splice(index, 1);
        }
      });

      promises.push(promise);
    }

    Promise.all(promises).then(callback);
  }

  static loadImage(src) {
    return new Promise((resolve, reject) => {
      try {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = src;
      } catch (error) {
        reject(error);
      }
    });
  }

  static loadJson(address) {
    return new Promise((resolve, reject) => {
      fetch(address)
        .then((result) => result.json())
        .then((json) => resolve(json))
        .catch((error) => reject(error));
    });
  }
  static loadSound(src) {
    return new Promise((resolve, reject) => {
      try {
        const audio = new Audio();
        audio.addEventListener("canplaythrough", () => resolve(audio));
        audio.src = src;
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Loader;
