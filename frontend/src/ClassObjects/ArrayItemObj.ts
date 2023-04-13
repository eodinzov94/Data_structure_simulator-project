import {
  ActionType,
  Events,
} from "../components/Simulation/BinaryTree/BinaryTreeTypes";

export class ArrayItemObj {
  value: number;
  id: number;
  action: ActionType;
  swapIndex: number | null;
  speed: number;
  ghosted: boolean;

  constructor(
    value: number,
    id: number,
    speed: number,
    ghosted: boolean = false
  ) {
    this.value = value;
    this.id = id;
    this.action = ActionType.NONE;
    this.speed = speed;
    this.swapIndex = null;
    this.ghosted = ghosted;
  }

  setAction(action: ActionType, swapIndex: number | null) {
    this.action = action;
    this.swapIndex = swapIndex;
  }

  static generateArrayObjects(
    items: number[],
    speed: number,
    currentHeapSize?: number
  ) {
    if (currentHeapSize === undefined) {
      return items.map((value, index) => {
        return new ArrayItemObj(value, index, speed);
      });
    }
    const arrayObjects = [];
    for (let i = 0; i < currentHeapSize; i++) {
      arrayObjects.push(new ArrayItemObj(items[i], i, speed));
    }
    for (let i = currentHeapSize; i < items.length; i++) {
      arrayObjects.push(new ArrayItemObj(items[i], i, speed, true));
    }
    return arrayObjects;
  }

  static setActions(arrayObjects: ArrayItemObj[], actions: Events | null) {
    if (actions) {
      try {
        for (let action of actions) {
          if (action.action === ActionType.SWAP) {
            if (typeof action.item2 !== "number") {
              throw new Error("item2 is required for swap action");
            }
            arrayObjects[action.item].setAction(
              ActionType.SWAP,
              arrayObjects[action.item2].id
            );
            arrayObjects[action.item2].setAction(
              ActionType.SWAP,
              arrayObjects[action.item].id
            );
          } else {
            arrayObjects[action.item].setAction(action.action, null);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
