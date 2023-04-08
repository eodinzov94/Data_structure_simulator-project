import { Drawer, IconButton, Input, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { FC, useState } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import HeapAnimationController from '../../../ClassObjects/HeapAnimationController'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {setInputArray, setInputKey} from '../../../store/reducers/alghoritms/heap-reducer'
import {getArrFromInput} from "../Sorts/helpers/functions";

interface Props {
  controller: HeapAnimationController
}

const HeapControlsPanel: FC<Props> = ({ controller }) => {
  const [open, setOpen] = useState(true)
  const inputArray = useAppSelector(state => state.heap.inputArray)
  const inputKey = useAppSelector(state=> state.heap.inputKey)
  const dispatch = useAppDispatch()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const createHeapHandler = async () => {
    const arr = getArrFromInput(25, inputArray)
    if (typeof arr !== 'string') {
      controller.setArray(arr)
    }
    await Animate('Create')
  }
  const Animate = async (animation: string) => {
    switch (animation) {
      case 'Create':
        await controller.buildMaxHeap()
        return
      case 'Heap-Max':
        await controller.heapMax()
        return
      case 'Extract-Max':
        await controller.extractMax()
        return
      case 'Insert Key':
        await controller.insertKey(inputKey)
        return
      case 'Heap-Sort':
        await controller.heapSort()
        return
      default:
        return
    }

  }
  return (
    <>
      {open ? <Drawer variant='persistent' elevation={11} anchor='left' open={open} hideBackdrop
                      ModalProps={{ disableEnforceFocus: true }} PaperProps={{
          style: {
            height: '335px',
            top: '25%',
            border: '2px solid #84cc16',
            borderRadius: '20px',
            marginLeft:5
          },
        }}>
          <div className='flex justify-end'>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft className='bg-lime-400 rounded-full' />
            </IconButton>
          </div>
          <List>
            <ListItem key={'Create'}>
              <div className='flex justify-end items-center'>
                <ListItemText primary={'Create'} />
                <Input className='ml-5' placeholder='e.g 1,2,3,4,...' value={inputArray}
                       onChange={(e) => dispatch(setInputArray(e.target.value))} />
                <ListItemButton onClick={createHeapHandler}>
                  GO
                </ListItemButton>
              </div>
            </ListItem>
            {['Heap-Max', 'Extract-Max'].map((text) => (
              <ListItem key={text}>
                <div className='flex justify-end items-center'>
                  <ListItemText>{text}</ListItemText>
                  <ListItemButton onClick={async () => await Animate(text)}>
                    GO
                  </ListItemButton>
                </div>
              </ListItem>
            ))}
              <ListItem key={'Insert Key'}>
                <ListItemText primary={'Insert Key'} />
                <Input className='ml-5' placeholder='e.g 1,2,3,4,...' value={inputKey}
                       onChange={(e) => dispatch(setInputKey(Number(e.target.value)))} />
                <ListItemButton onClick={async () => await Animate('Insert Key')}>
                  GO
                </ListItemButton>
              </ListItem>
          </List>
        {/*//TODO:Add heapsort controller*/}
        </Drawer>
        :
        <div className='flex justify-start absolute top-1/4'>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronRight color='action' className='bg-lime-400 rounded-full' />
          </IconButton>
        </div>
      }
    </>

  )
}

export default HeapControlsPanel