/* jslint es6 */
import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';
import ms from 'ms';
import toastr from 'toastr';
import { Avatar, AppBar, Tabs, Tab, Box, Button, Divider, Paper, Grid, Breadcrumbs, Typography, Stack, IconButton } from '@mui/material';
// import { ListManager } from 'react-beautiful-dnd-grid';
import history from '../../core/history';
import Link from '../../components/Link';
import UtilityCard from '../../components/DigitalUtilities/UtilityCard';
import UtilityActivities from '../../components/DigitalUtilities/UtilityActivities';
import EditUtility from '../../components/DigitalUtilities/EditUtility';
import ListManager from '../../components/DnD/ListDnD';
import { listCategory, listService, hideShowService, orderingService } from '../../services/services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const Manage = ({ id }) => {
  const { user, configs } = useSelector((state) => state);
  const { pathname } = history.location;
  const theme = useTheme();
  const [list, setList] = useState([]);

  const getList = () => {
    listCategory({}).then((response) => {
      setList(_.get(response, 'data', []));
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Fragment>
      <Box sx={{ background: '#EEF2F6', py: 1.5, px: 2 }}>
        <Breadcrumbs separator={<i className="icon-linear-arrow-right-1" />} aria-label="breadcrumb">
          <Link underline="hover" key="1" color="#2E3236" to="/app-manager">
            Tiện ích
          </Link>
        </Breadcrumbs>
      </Box>
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        {list.map((item) => (
          <Link to={`/app-manager/${item._id}`}>
            <Button key={item._id} variant="text" fullWidth>
              {item.title}
            </Button>
          </Link>
        ))}
      </Box>
    </Fragment>
  );
};

export default Manage;
