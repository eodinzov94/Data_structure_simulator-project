import { Typography } from '@mui/material'
import { ReactElement, useState } from 'react';
import Tooltip from "@mui/material/Tooltip";
type Props = {
    isButtonDisabled: boolean
    children: ReactElement
}


export const ControlsToolTip = ({ isButtonDisabled, children }: Props) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };
    return (
        <Tooltip
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title={<Typography variant="subtitle2" component="div" align="center">Controls are disabled during simulation{'\n'}pause simulation to access it</Typography>}
            arrow
            open={isButtonDisabled && showTooltip}
            placement="top"
        >
            {children}
        </Tooltip>)

}       