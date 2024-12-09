import React from 'react';
import {
    styled,
    useTheme
} from '@mui/material/styles';
import {
    CircularProgress,
    Backdrop
} from '@mui/material';

//3rd
import _ from 'lodash';

const LoadingBackdrop = ({loading}) => {
    const theme = useTheme()
    
    return <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="primary" />
            </Backdrop>
}

export default (LoadingBackdrop);
