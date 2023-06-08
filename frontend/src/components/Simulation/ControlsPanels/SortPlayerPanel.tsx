import {
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Slider,
  Stack,
  ThemeProvider,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SpeedIcon from "@mui/icons-material/Speed";
import { useAppSelector } from "../../../store/hooks";
import SortController from "../../../ClassObjects/SortControllers/SortController";

interface Props {
  controller: SortController;
}

const SortPlayerPanel = (props: Props) => {
  const { controller } = props;
  const isPlaying = useAppSelector(
    (state) => state.animationController.isPlaying
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: "#78ab3a",
      },
      secondary: {
        main: "#78ab3a",
      },
    },
  });
  return (
    <>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="mt-10"
      >
        <ThemeProvider theme={theme}>
          <Box className="mt-1 mr-5 w-28">
            <Stack spacing={2} direction="row" alignItems="center">
              <Slider
                step={0.25}
                color="primary"
                defaultValue={1.25}
                min={0.25}
                max={3}
                onChange={(event: Event, newValue: number | number[]) =>
                  props.controller.setSpeed(newValue as number)
                }
              />
              <SpeedIcon color="primary" />
            </Stack>
          </Box>
          <Button
            onClick={async () => {
              await controller.playFirstFrame();
            }}
          >
            <SkipPreviousIcon />
          </Button>
          <Button
            onClick={async () => {
              await controller.playPreviousFrame();
            }}
          >
            <ChevronLeftIcon />
          </Button>
          {isPlaying ? (
            <Button
              onClick={async () => {
                await controller.setStopFlag(true);
              }}
            >
              <PauseIcon />
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await controller.Play();
              }}
            >
              <PlayArrowIcon />
            </Button>
          )}
          <Button
            onClick={async () => {
              await controller.playNextFrame();
            }}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            onClick={async () => {
              await controller.playLastFrame();
            }}
          >
            <SkipNextIcon />
          </Button>
        </ThemeProvider>
      </ButtonGroup>
    </>
  );
};

export default SortPlayerPanel;
