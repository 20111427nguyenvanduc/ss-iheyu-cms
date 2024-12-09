import * as React from 'react';
import { styled } from '@mui/material/styles';
import {TextField} from '@mui/material';

const CustomTextField = ({ ...others }) => <TextField variant="outlined" {...others} />;
export default CustomTextField