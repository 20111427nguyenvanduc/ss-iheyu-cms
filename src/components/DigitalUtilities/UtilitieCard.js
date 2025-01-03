import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
const noFunc = () => {};

const Frame = ({ icon, label, action = 'edit', open = 0, editAction = noFunc, hideAction = noFunc, showAction = noFunc, orderingAction = noFunc, ...props }) => {
  const listActions = {
    edit: {
      icon: <EditIcon />,
      label: 'Sửa',
      action: editAction,
    },
    hide: [
      {
        icon: <VisibilityOffIcon />,
        label: 'Ẩn',
        action: showAction,
      },
      {
        icon: <VisibilityIcon />,
        label: 'Hiện',
        action: hideAction,
      },
    ],
    ordering: {
      icon: <ChangeCircleIcon />,
      label: 'Sắp xếp',
      action: orderingAction,
    },
    // Add more actions here...
  };
  let currentAction = action === 'hide' ? listActions[action][open] : listActions[action];
  return (
    <Box
      sx={{
        width: 136,
        height: 183,
        bgcolor: 'white',
        borderRadius: 2,
        border: 1,
        borderColor: 'grey.300',
        position: 'relative',
      }}
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#E5F1FF',
          borderRadius: '50%',
          width: 36,
          height: 36,
          cursor: 'pointer',
          position: 'absolute',
          top: -10,
          right: -10,
          cursor: 'pointer',
        }}
      >
        {currentAction ? (
          <IconButton
            sx={{
              width: 36,
              height: 36,
              color: 'primary.main',
            }}
            title={currentAction.title}
            onClick={currentAction.action}
          >
            {currentAction.icon}
          </IconButton>
        ) : null}
      </Box>
      <Box
        sx={{
          width: 134,
          height: 128,
          p: '16px 20px',
        }}
      >
        <Box
          component="img"
          src={icon}
          alt="Frame"
          sx={{
            width: 96,
            height: 96,
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box sx={{ p: '0px 16px' }}>
        <Typography
          component="p"
          sx={{
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default Frame;
