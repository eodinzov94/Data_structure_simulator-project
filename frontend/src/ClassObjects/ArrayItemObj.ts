import { ActionType, Events } from '../components/Simulation/BinaryTree/BinaryTreeTypes'

export class ArrayItemObj {
    value: number;
    id: number
    action: ActionType;
    swapIndex: number | null;
    speed: number;
    visible: boolean;//TODO:Add animation

    constructor(value: number, id: number, speed: number) {
        this.value = value;
        this.id = id;
        this.action = ActionType.NONE;
        this.speed = speed
        this.swapIndex = null;
        this.visible = true;
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
                        if (typeof action.item2 !== 'number') {
                            throw new Error('item2 is required for swap action')
                        }
                        arrayObjects[action.item].setAction(ActionType.SWAP, arrayObjects[action.item2].id)
                        arrayObjects[action.item2].setAction(ActionType.SWAP, arrayObjects[action.item].id)
                    }
                    // else if(action.action === ActionType.MASHU){
                    //     //TODO:set invisible
                    // }
                    else {
                        arrayObjects[action.item].setAction(action.action, null)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

}
