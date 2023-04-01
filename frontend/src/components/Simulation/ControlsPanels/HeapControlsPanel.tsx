import { Drawer, IconButton, Input, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { FC, useState } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import HeapAnimationController from '../../../ClassObjects/HeapAnimationController'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setInputArray } from '../../../store/reducers/alghoritms/heap-reducer'
import { getArrFromInput } from '../Sorts/helpers'

interface Props {
  controller: HeapAnimationController
}

const HeapControlsPanel: FC<Props> = ({ controller }) => {
  const [open, setOpen] = useState(true)
  const inputArray = useAppSelector(state => state.heap.inputArray)
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
            borderLeft: 'none',
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
            {['Insert Key', 'Heap-Sort'].map((text) => (
              <ListItem key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
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