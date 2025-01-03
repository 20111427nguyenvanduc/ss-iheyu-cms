/* jslint es6 */
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';
import ms from 'ms';
import toastr from 'toastr';
import { Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment, Chip } from '@mui/material';
import { updateIconService } from '../../services/services';
import UploadImgSingle from '../tools/UploadImgSingle';
const noop = () => {};
const EditUtility = ({ onSuccess = noop, onFailue = noop, utility, setUtility }) => {
  const [item, setItem] = useState(utility);

  useEffect(() => {
    setItem(utility);
  }, [utility]);

  const handleClose = () => {
    setUtility(null);
  };

  const handleUpdate = () => {
    if (!_.get(item, 'icon')) {
      toastr.warning('Chưa có biểu tượng');
      return;
    }

    updateIconService({
      id: item._id,
      icon: item.icon,
    })
      .then((res) => {
        if (_.get(res, 'code') === 200) {
          onSuccess(_.get(res, 'data'));
          toastr.success('Cập nhật thành công!');
        } else {
          onFailue(res);
        }
      })
      .catch((error) => {
        onFailue(error);
        toastr.error('Lỗi hệ thống. Vui lòng thử lại sau.');
      });
  };

  const compareData = () => {
    if (!_.get(item, 'icon') || !_.get(utility, 'icon') !== !_.get(item, 'icon')) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth={'xs'} open={utility ? true : false} onClose={handleClose} PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle>
          <Typography component="p" sx={{ fontSize: '22px', color: '#2E3236', fontWeight: 700 }}>
            Đổi logo tiện ích
          </Typography>
          <Typography component="p" sx={{ fontSize: '18px', color: '#143250', fontWeight: 400 }}>
            {_.get(utility, 'name')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="20px" mt={1}>
            <Box sx={{ width: '100%' }} display="flex" flexDirection="column" justifyContent="center" alignItems="start" gap="16px">
              <Typography variant="p" sx={{ fontSize: '18px', color: '#4A4F55', fontWeight: 400 }}>
                Biểu tượng
              </Typography>

              <UploadImgSingle
                id={_.get(item, '_id')}
                width={'100%'}
                height={'150px'}
                folder="icon-service"
                imageUrl={_.get(item, 'icon')}
                onUploadSuccess={(imageUrl) => {
                  setItem({ ...item, icon: imageUrl });
                }}
                onDeleteFile={(filename) => {
                  setItem({ ...item, icon: '' });
                }}
              >
                <Stack direction="column" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <img src="/images/icon-upload.png" style={{ width: '40px' }} />
                  <Typography variant="p" sx={{ fontSize: '14px', color: '#656C75', fontWeight: 400 }}>
                    Thêm file/ hình ảnh{' '}
                  </Typography>
                  <Chip label="Chọn file " />
                </Stack>
              </UploadImgSingle>
              <Button
                onClick={handleUpdate}
                disabled={compareData()}
                fullWidth
                variant="contained"
                type="submit"
                sx={{ borderRadius: '12px', background: '#007CFE', fontSize: '16px', padding: '12px', textTransform: 'initial' }}
              >
                Cập nhật
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditUtility;
