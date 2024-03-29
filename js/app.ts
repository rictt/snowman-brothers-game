import { Canvas2DApplication, CanvasInputEvent, CanvasKeyBoardEvent, CanvasMouseEvent } from './base/application'

export class GameApplication extends Canvas2DApplication {
  public ctx: CanvasRenderingContext2D;
  // 中心点
  public cx: number = 0;
  public cy: number = 0;
  public sprites: ISprite[] = [];
  public player: IPlayer;
  public rocker: IRocker
  public map: ISprite;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.ctx = this.context2D as CanvasRenderingContext2D
    // this.canvas.width = window.innerWidth
    // this.canvas.height = window.innerHeight
    this.canvas.width = 667
    this.canvas.height = 375
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i: number = 0; i < this.sprites.length; i++) {
      let sp: ISprite = this.sprites[i]
      if (sp.visible) {
        sp.draw(this.ctx)
      }
    }
  }

  public update(elapsedMsec: number, intervalSec: number): void {
    for (let i: number = 0; i < this.sprites.length; i++) {
      let sp: ISprite = this.sprites[i]
      sp.update && sp.update(elapsedMsec, intervalSec)
    }
  }

  public setMap(map: Srpite): void {
    this.map = map
  }

  public setPlayer(player: IPlayer): void {
    this.player = player
  }

  public setRocker(rocker: IRocker): void {
    this.rocker = rocker
  }

  /**
   * 
   * @param sp 
   * @param index 插入的顺序，渲染顺序
   */
  public addSprite(sp: ISprite, index?: number): void {
    if (index >= 0) {
      this.sprites.splice(index, 0, sp)
    } else {
      this.sprites.push(sp)
    }
  }

  // 只有落在精灵的范围内，才允许分发点击事件
  protected dispatchClick(evt: CanvasMouseEvent): void {
    this.sprites.forEach(sp => {
      if (sp.onClick) {
        const canvasPos = evt.canvasPosition
        const { x, y } = canvasPos
        if (sp.isInSpriteArea(x, y)) {
          sp.onClick(evt)
        }
      }
    })
  }

  protected dispatchTouchStart(evt: TouchEvent): void {
    this.sprites.forEach(sp => {
      if (sp.isSupportTouch && sp.onTouchStart) {
        const touch = evt.touches[0]
        if (sp.isInSpriteArea(touch.clientX, touch.clientY)) {
          sp.onTouchStart(evt)
        }
      }
    })
  }

  protected dispatchTouchMove(evt: TouchEvent): void {
    this.sprites.forEach(sp => {
      if (sp.onTouchMove) {
        sp.onTouchMove(evt)
      }
    })
  }

  protected dispatchTouchEnd(evt: TouchEvent): void {
    this.sprites.forEach(sp => {
      if (sp.onTouchEnd) {
        sp.onTouchEnd(evt)
      }
    })
  }

  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
      this.sprites.forEach(sp => {
        if (sp.onKeyDown) {
          sp.onKeyDown(evt)
        }
      })
  }

  public drawCircle(x: number, y: number, radius: number, style: string = '#000', isFill: boolean = true): void {
    this.ctx.save()
    this.ctx.translate(x, y)
    if (isFill) {
      this.ctx.fillStyle = style
    } else {
      this.ctx.strokeStyle = style
    }
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2)
    if (isFill) {
      this.ctx.fill()
    } else {
      this.ctx.stroke()
    }
    this.ctx.restore()
  }

  public drawRect(x: number, y: number, width: number = 50, height: number = 50, style: string = '#000', isFill: boolean = true): void {
    this.ctx.save()
    this.ctx.beginPath()
    if (isFill) {
      this.ctx.fillStyle = style
    } else {
      this.ctx.strokeStyle = style
    }
    this.ctx.rect(x, y, width, height)
    if (isFill) {
      this.ctx.fill()
    } else {
      this.ctx.stroke()
    }
    this.ctx.closePath()
    this.ctx.restore()
  }

  public drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number = 1, style: string = '#000'): void {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.strokeStyle = style
    this.ctx.lineWidth = lineWidth
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.restore()
  }

  public drawPoint(x: number = 0, y: number = 0, radius: number = 3): void {
    this.ctx.save()
    this.ctx.translate(x, y)
    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.restore()
  }
}
