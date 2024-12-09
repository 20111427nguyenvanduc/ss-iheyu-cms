import * as React from 'react';
import {styled} from '@mui/material/styles';
import {
  Button,
  ButtonGroup,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DropDownButton from './Dropdown';

const StyledButtonGroup = styled(ButtonGroup)(({theme})=> ({

}))

const StyledButton = styled(Button)(({theme})=> ({
 
}))

const noOp = () => {}

export default function PagingButton({page = 0, limit = 0, count = 0, onPageChange = noOp, onLimitChange = noOp, disablePaging}) {
  const onClickPrev = () => {
    onPageChange( page-1 )
  }

  const onClickNext = () => {
    onPageChange( page+1 )
  }

  const start = page * limit
  return (<React.Fragment>
    <DropDownButton select={limit} options={[5, 10, 20, 30, 50, 100, 200]} onChange={(newopt)=>onLimitChange(newopt)} disabled={disablePaging}/>
    <StyledButtonGroup disableElevation variant="contained" aria-label="text button group">
      <StyledButton disabled={disablePaging} onClick={onClickPrev} disabled={!page}><ChevronLeftIcon/></StyledButton>
      <StyledButton readOnly>{count ? start + 1 : 0} - { count ? start + count : start}</StyledButton>
      <StyledButton disabled={disablePaging} onClick={onClickNext} disabled={limit !== count}><ChevronRightIcon/></StyledButton>
    </StyledButtonGroup>
  </React.Fragment>);
}