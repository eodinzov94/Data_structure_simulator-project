
export class BranchObj {
  static baseSize = 15;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  constructor(position:{x1: number, y1: number, x2: number, y2: number}) {
    let { x1, x2, y1, y2, } = position
    this.x1 = x1 + BranchObj.baseSize
    this.x2 = x2 + BranchObj.baseSize
    this.y1 = y1 + BranchObj.baseSize
    this.y2 = y2 + BranchObj.baseSize
  }

  getBranchLength(){
    return Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2))
  }
  getRotateAngle(){
    return (Math.atan2(this.y2 - this.y1, this.x2 - this.x1) * 180 / Math.PI)
  }
  getBranchPosition(){
    return {
      x1: this.x1,
      x2: this.x2,
      y1: this.y1,
      y2: this.y2,
    }
  }
  getStyle(){
    return {
      top: this.y1 + 'px',
      left: this.x1 + 'px',
      width: this.getBranchLength() + 'px',
      transform: `rotate(${this.getRotateAngle()}deg)`,
    }
  }
}
