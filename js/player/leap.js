import Sprite from '/js/base/sprite'
import LEAP_IMG_SRC from '/images/btn-leap.png'

const WIDTH = 90
const HEIGHT = 90
const MAX_WIDTH = 100
const MAX_HEIGHT = 100

class Leap extends Sprite {
  constructor(player) {
    super(
      LEAP_IMG_SRC,
      WIDTH,
      HEIGHT,
      window.innerWidth - WIDTH,
      window.innerHeight - HEIGHT - 60
    )
    this.player = player
    this.on('click', this.onClick.bind(this))
  }

  onClick() {
    this.expand = true
    this.player && this.player.onLeap && this.player.onLeap()
  }

  draw() {
    if (this.expand) {
      this.width += 2
      this.height += 2
      this.x -= 1
      this.y -= 1
      
      if (this.width >= MAX_WIDTH) {
        this.width = WIDTH
        this.x = window.innerWidth - WIDTH
        this.expand = false
      }
      if (this.height >= MAX_HEIGHT) {
        this.height = HEIGHT
        this.y = window.innerHeight - HEIGHT - 60
        this.expand = false
      }
    }
    this.drawToCanvas()
  }
}

export default Leap