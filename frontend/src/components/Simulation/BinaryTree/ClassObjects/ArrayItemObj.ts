import { ActionType, Events } from '../Helpers/MapActionToStyles'

export class ArrayItemObj {
    value: number;
    id: number
    action: ActionType;
    swapIndex: number | null;
    speed: number;

    constructor(value: number, id: number, speed: number) {
        this.value = value;
        this.id = id;
        this.action = ActionType.NONE;
        this.speed = speed
        this.swapIndex = null;
    }

    setAction(action: ActionType, swapIndex: number | null) {
        this.action = action
        this.swapIndex = swapIndex
    }

    static generateArrayObjects(items: number[], speed: number) {

        return items.map((value, index) => {
            return new ArrayItemObj(value, index, speed)
        })
    }

    static setActions(arrayObjects: ArrayItemObj[], actions: Events | null) {
        if (actions) {
            try {
                for (let action of actions) {
                    if (action.action === ActionType.SWAP) {
                        if (!action.item2) {
                            throw new Error('item2 is required for swap action')
                        }
                        arrayObjects[action.item].setAction(ActionType.SWAP, arrayObjects[action.item2].id)
                        arrayObjects[action.item2].setAction(ActionType.SWAP, arrayObjects[action.item].id)
                    } else {
                        arrayObjects[action.item].setAction(action.action, null)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

}
