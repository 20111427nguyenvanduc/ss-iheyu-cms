import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { popoverClasses } from '@mui/material/Popover'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import ArchiveIcon from '@mui/icons-material/Archive'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  [`&.${popoverClasses.root}`]: {
    zIndex: 1199
  },
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

export default function LongMenu ({ id, items }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-label='more'
        id={'long-button' + id}
        aria-controls={open ? id : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        variant='outlined'
        size='small'
        sx={{ padding: '3px' }}
      >
        <MoreHorizIcon />
      </Button>
      {items && items.length ? (
        <StyledMenu
          id={id}
          MenuListProps={{
            'aria-labelledby': id
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {items.map((item, i) => (
            <MenuItem
              key={i}
              disableRipple
              sx={{ display: 'block', padding: '0px' }}
            >
              {item}
            </MenuItem>
          ))}
        </StyledMenu>
      ) : null}
    </div>
  )
}
