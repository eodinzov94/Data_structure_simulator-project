import {Box, Button, ButtonGroup, createTheme, Slider, Stack, ThemeProvider, Tooltip} from '@mui/material'
import React, {FC} from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PauseIcon from '@mui/icons-material/Pause'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SpeedIcon from '@mui/icons-material/Speed'
import {useAppSelector} from '../../../store/hooks'
import AnimationController from '../../../ClassObjects/AnimationController'

interface Props {
    controller: AnimationController<any, any>
}

const PlayerControlsPanel: FC<Props> = ({controller}) => {
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
                    <Tooltip title="Speed">
                        <Box className='mt-1 mr-5 w-28'>
                            <Stack spacing={2} direction='row' alignItems='center'>
                                <SpeedIcon color='primary' fontSize="large"/>
                                <Slider step={0.25} color='primary' defaultValue={1} min={0.25} max={2}
                                        onChange={(event: Event, newValue: number | number[]) => controller.setSpeed(newValue as number)}/>
                            </Stack>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Jump to start">
                        <Button onClick={async () => await controller.jumpToStart()}><SkipPreviousIcon/></Button>
                    </Tooltip>
                    <Tooltip title="Previous frame">
                        <Button onClick={async () => await controller.playPreviousFrame()}><ChevronLeftIcon/></Button>
                    </Tooltip>
                    {!isPlaying ?
                        <Tooltip title="Play">
                            <Button onClick={async () => {
                                await controller.playAnimation()}}>
                                <PlayArrowIcon/>
                            </Button>
                        </Tooltip> :
                        <Tooltip title="Pause">
                            <Button onClick={
                                async () => {
                                    await controller.pause()
                                }
                            }><PauseIcon/></Button></Tooltip>}
                    <Tooltip title="Next frame">
                        <Button onClick={async () => await controller.playNextFrame()}><ChevronRightIcon/></Button>
                    </Tooltip>
                    <Tooltip title="Jump to end">
                        <Button onClick={async () => await controller.jumpToEnd()}><SkipNextIcon/></Button>
                    </Tooltip>
                </ThemeProvider>
            </ButtonGroup>
        </>
    )
}

export default PlayerControlsPanel