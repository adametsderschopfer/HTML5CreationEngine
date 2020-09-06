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

(function () {
  "use strict";

  class Loader {
    constructor() {
      this.loadOrder = {
        images: [],
        jsons: [],
      };

      this.resources = {
        images: [],
        jsons: [],
      };
    }

    addImage(name, src) {
      this.loadOrder.images.push({ name, src });
    }

    addJson(name, address) {
      this.loadOrder.jsons.push({ name, address });
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
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Loader = Loader;
})();
