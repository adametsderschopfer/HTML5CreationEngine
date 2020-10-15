import ArcadePhysics from "./ArcadePhysics";
import Body from "./Body";
import Container from "./Container";
import DisplayObject from "./core/DisplayObject";
import EventEmitter from "./core/EventEmitter";
import Game from "./Game";
import Keyboard from "./core/Keyboard";
import Loader from "./core/Loader";
import Mouse from "./core/Mouse";
import Renderer from "./Renderer";
import Scene from "./Scene";
import Sprite from "./Sprite";
import Util from "./Util";
import Primitives from "./Primitives";
import ClickbleElements from "./ClickbleElements";
import store from "./core/Store/Store";

Object.assign(Game, {
  ArcadePhysics,
  Body,
  Primitives,
  Container,
  DisplayObject,
  EventEmitter,
  Game,
  Keyboard,
  Loader,
  Mouse,
  Renderer,
  Scene,
  Sprite,
  Util,
  ClickbleElements,
});

export {
  ArcadePhysics,
  Body,
  Container,
  DisplayObject,
  EventEmitter,
  Game,
  Keyboard,
  Loader,
  Mouse,
  Renderer,
  Scene,
  Sprite,
  Util,
  store,
  ClickbleElements,
};

export default Game;
