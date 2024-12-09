import * as React from 'react';
import {styled} from '@mui/material/styles';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledButtonGroup = styled(ButtonGroup)(({theme})=> ({
  
}))

export default function Select({options = [], value, onChange=()=> {}, others}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const select = options[options.map(opt=>opt.value).indexOf(value)]
  const handleMenuItemClick = (event, value) => {
    onChange(value);
    handleClose(event)
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <StyledButtonGroup {...others} disableElevation variant="contained" ref={anchorRef} aria-label="split button">
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ minWidth: '70px' }}
        >
          {_.get(select, 'label')} <ArrowDropDownIcon />
        </Button>
      </StyledButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper sx={{boxShadow: 'none'}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === value}
                      onClick={(event) => handleMenuItemClick(event, option)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}