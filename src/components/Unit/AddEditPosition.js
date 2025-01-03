/* jslint es6 */
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';
import ms from 'ms';
import toastr from 'toastr';
import { Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment, MenuItem } from '@mui/material';
import { create as createPosition, update as updatePosition } from '../../services/position';

const AddEditPosition = ({ children, onClose = () => {}, unitCurrent, detail = null }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('staff');

  useEffect(() => {
    if (open) {
      setStateData();
    }
  }, [open, detail]);

  const setStateData = () => {
    setName(_.get(detail, 'name'));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetState = () => {
    setName('');
  };

  const handleCreate = () => {
    if (!name) {
      toastr.warning('Nhập tên chức vụ');
      return false;
    }

    try {
      createPosition({ name, unit: _.get(unitCurrent, '_id'), permissions: [], groupPermissions: [], role }).then((res) => {
        if (_.get(res, 'code') === 200) {
          handleClose();
          onClose();
          resetState();
          toastr.success('Tạo chức vụ thành công!');
        }
      });
    } catch (error) {
      toastr.error('Lỗi hệ thống. Vui lòng thử lại sau.');
    }
  };

  const handleUpdate = () => {
    if (!name) {
      toastr.warning('Nhập tên chức vụ');
      return false;
    }
    try {
      updatePosition({ _id: _.get(detail, '_id'), name, unit: _.get(unitCurrent, '_id'), permissions: _.get(detail, 'permissions'), groupPermissions: _.get(detail, 'groupPermissions'), role }).then(
        (res) => {
          if (_.get(res, 'code') === 200) {
            handleClose();
            onClose();
            resetState();
            toastr.success('Cập nhật chức vụ thành công!');
          }
        }
      );
    } catch (error) {
      toastr.error('Lỗi hệ thống. Vui lòng thử lại sau.');
    }
  };

  return (
    <React.Fragment>
      {React.cloneElement(
        children || (
          <Button
            variant="contained"
            size="large"
            sx={{ padding: '12px 32px', background: '#00BF30', borderRadius: '12px', color: '#FFF', textTransform: 'inherit', '&:hover': { backgroundColor: '#00BF30', color: '#FFF' } }}
            startIcon={<i className="icon-linear-briefcase" />}
          >
            Thêm chức vụ mới
          </Button>
        ),
        { onClick: handleClickOpen }
      )}

      <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle>
          <Typography component="p" sx={{ fontSize: '22px', color: '#2E3236', fontWeight: 700 }}>
            {detail ? 'Sửa chức vụ' : 'Thêm chức vụ mới'}
          </Typography>
          <Typography component="p" sx={{ fontSize: '18px', color: '#143250', fontWeight: 400 }}>
            Trực thuộc {_.get(unitCurrent, 'name')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="20px" mt={1}>
            <Box sx={{ width: '100%' }} display="flex" flexDirection="column" justifyContent="center" alignItems="start" gap="16px">
              <Typography variant="p" sx={{ fontSize: '18px', color: '#4A4F55', fontWeight: 400 }}>
                Tên chức vụ
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập tên chức vụ"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ name: 'name', ariallabel: 'name' }}
                InputProps={{
                  sx: { borderRadius: '16px' },
                }}
              />
              {/* <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Vai trò
       </Typography>
       <TextField
        fullWidth
        select
        sx={{
         "& .MuiSelect-select span::before": {
          content: "'Chọn vai trò'",
         },
        }}
        variant='outlined'
        value={role}
        onChange={(e) => setRole(e.target.value)}
        inputProps={{name: "level", ariallabel: "level"}}
       >
        {[
         {label: "Lãnh đạo", code: "leader"},
         {label: "Nhân viên", code: "staff"},
        ].map((option) => (
         <MenuItem key={option.code} value={option.code}>
          {option.label}
         </MenuItem>
        ))}
       </TextField> */}
              <Button
                onClick={() => {
                  if (detail) {
                    handleUpdate();
                  } else {
                    handleCreate();
                  }
                }}
                fullWidth
                variant="contained"
                type="submit"
                sx={{ borderRadius: '12px', background: '#007CFE', fontSize: '16px', padding: '12px', textTransform: 'initial' }}
              >
                {detail ? 'Cập nhật chức vụ' : 'Tạo chức vụ mới'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEditPosition;
