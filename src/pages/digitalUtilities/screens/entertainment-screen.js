import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';
import ms from 'ms';
import toastr from 'toastr';
import { Avatar, AppBar, Tabs, Tab, Box, Button, Divider, Paper, Grid, Breadcrumbs, Typography, Stack, IconButton } from '@mui/material';
// import { ListManager } from 'react-beautiful-dnd-grid';
import Link from '../../../components/Link';
import UtilityCard from '../../../components/DigitalUtilities/UtilityCard';
import UtilityActivities from '../../../components/DigitalUtilities/UtilityActivities';
import EditUtility from '../../../components/DigitalUtilities/EditUtility';
import ListManager from '../../../components/DnD/ListDnD';
import { listServiceChildren } from '../../../services/services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const Component = ({ id }) => {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState({});
  const getList = (service) => {
    listServiceChildren({ service }).then((response) => {
      setList(_.get(response, 'data', []));
      setInfo(_.get(response, 'info', {}));
    });
  };

  useEffect(() => {
    if (id) {
      getList(id);
    }
  }, [id]);

  return (
    <Fragment>
      <Box sx={{ background: '#EEF2F6', py: 1.5, px: 2 }}>
        <Breadcrumbs separator={<i className="icon-linear-arrow-right-1" />} aria-label="breadcrumb">
          <Link underline="hover" key="1" color="#2E3236" to="/app-manager">
            Ứng dụng
          </Link>
          <Link underline="hover" key="1" color="#2E3236" to={`/app-manager/${_.get(info, 'category._id', '')}`}>
            {_.get(info, 'category.title', '') || ''}
          </Link>
          <Typography key="2" sx={{ color: '#007CFE' }}>
            {_.get(info, 'name', '') || ''}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box p={2} display="flex" flexDirection="column" gap={2} sx={{ flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2 }}></Paper>
        <Paper sx={{ p: 2 }}></Paper>
      </Box>
    </Fragment>
  );
};

export default Component;
