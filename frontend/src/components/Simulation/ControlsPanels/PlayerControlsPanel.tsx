import { Box, Button, ButtonGroup, createTheme, Slider, Stack, ThemeProvider } from '@mui/material'
import React, { FC } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PauseIcon from '@mui/icons-material/Pause'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SpeedIcon from '@mui/icons-material/Speed'
import { useAppSelector } from '../../../store/hooks'
import AnimationController from '../../../ClassObjects/AnimationController'

interface Props {
  controller: AnimationController
}

const PlayerControlsPanel: FC<Props> = ({ controller }) => {
  const isPlaying = useAppSelector(state => state.heap.isPlaying)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#78ab3a',
      },
      secondary: {
        main: '#78ab3a',
      },
    },
  })
  return (
    <>
      <ButtonGroup variant='outlined' aria-label='outlined button group' className='mt-10'>
        <ThemeProvider theme={theme}>
          <Box className='mt-1 mr-5 w-28'>
            <Stack spacing={2} direction='row' alignItems='center'>
              <Slider step={0.25} color='primary' defaultValue={1} min={0.25} max={2}
                      onChange={(event: Event, newValue: number | number[]) => controller.setSpeed(newValue as number)} />
              <SpeedIcon color='primary' />
            </Stack>
          </Box>
          <Button onClick={async () => await controller.jumpToStart()}><SkipPreviousIcon /></Button>
          <Button onClick={async () => await controller.playPreviousFrame()}><ChevronLeftIcon /></Button>
          {!isPlaying ?
            <Button onClick={async () => {
              await controller.playAnimation()
            }
            }><PlayArrowIcon /></Button> :
            <Button onClick={
              async () => {
                await controller.pause()
              }
            }><PauseIcon /></Button>}
          <Button onClick={async () => await controller.playNextFrame()}><ChevronRightIcon /></Button>
          <Button onClick={async () => await controller.jumpToEnd()}><SkipNextIcon /></Button>
        </ThemeProvider>
      </ButtonGroup>
    </>
  )
}

export default PlayerControlsPanel