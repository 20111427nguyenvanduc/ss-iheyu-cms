import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import {
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';

const TextFieldStyled = styled(TextField)(({theme})=>({
  backgroundColor: theme.palette.background.paper,
  minWidth: '240px'
}))

const SearchInput = ({ ...others }) => {
  const theme = useTheme()
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return <TextFieldStyled
  autoComplete="off"
  variant="outlined" 
  InputProps={{
    startAdornment: (
      <InputAdornment position="end">
        <IconButton
          type="submit"
          aria-label="search"
          onMouseDown={handleMouseDown}
          edge="end"
          sx={{color: theme.palette.text.primary}}
        >
          <SearchIcon sx={{width: '25px', height: '25px'}}/>
        </IconButton>
      </InputAdornment>
    ),
  }}
  {...others} />
};
export default SearchInput