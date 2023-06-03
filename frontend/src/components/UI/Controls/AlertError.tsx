import { Alert } from '@mui/material';
import React from 'react';

type AlertErrorProps = {
    error: string
    onClose: () => void
}

export const AlertError = ({error,onClose }: AlertErrorProps) => (
    <div className="flex absolute top-[48px] inset-0 justify-center py-10 ">
        <Alert
            severity="error"
            color="error"
            className="w-[670px] h-[50px]"
            onClose={onClose}
        >
            {error}
        </Alert>
    </div>
);