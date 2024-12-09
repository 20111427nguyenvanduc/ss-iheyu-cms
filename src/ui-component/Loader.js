import React from 'react';

// material-ui
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

// style constant
const Loading = styled(Box)(({theme})=>{
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%',
    '& > * + *': {
        marginTop: theme.spacing(2)
    }
})

// ===========================|| Loader ||=========================== //

const Loader = () => {
    return (
        <Loading>
            <LinearProgress color="primary" />
        </Loading>
    );
};

export default Loader;
