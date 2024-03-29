declare module '*.png' {
  const value: any;
  export = value;
}
declare module '*.gif' {
  const value: any;
  export = value;
}
interface ISprite {
  x: number;
  y: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
  src: string;
  visible: boolean;
  scaleX?: number;
  scaleY?: number;
  isSupportTouch: boolean;
  velocityY: number;
  velocityY: number;
  collideType: number | null;
  collideSprite: Sprite | null;


  draw: (ctx: CanvasRenderingContext2D) => void;
  isInSpriteArea: (x: number, y: number) => boolean;
  isCollideWith: (sp: Sprite) => boolean;
  onClick?: (evt: CanvasMouseEvent) => void;
  onTouchStart?: (evt: TouchEvent) => void;
  onTouchMove?: (evt: TouchEvent) => void;
  onTouchEnd?: (evt: TouchEvent) => void;
  onKeyDown?: (evt: CanvasKeyBoardEvent) => void;
  update?(elapsedMsec: number, intervalSec: number): void;
}
interface IRocker extends ISprite {
  innerX: number;
  innerY: number;
  targetVec: vec2;
}

interface IPlayer extends ISprite {
  boundaryRect: Rectangle;
  
  setVector(x: number, y?: number): void
  setSize(w: number, h: number): void
}

interface Direction {
  LEFT,
  CENTER,
  RIGHT
}