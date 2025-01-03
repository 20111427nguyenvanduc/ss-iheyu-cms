/* jslint es6 */
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';
import ms from 'ms';
import toastr from 'toastr';
import { Avatar, AppBar, Tabs, Tab, Box, Button, Divider, Paper, Grid, Breadcrumbs, Typography, Stack, IconButton } from '@mui/material';

import Link from '../../components/Link';
import UtilitieCard from '../../components/DigitalUtilities/UtilitieCard';
import UtilitieActivities from '../../components/DigitalUtilities/UtilitieActivities';
import { listCategory, listService, hideShowService, orderingService } from '../../services/services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Activitie = () => {
  const activities = [
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
    {
      imgSrc: 'https://via.placeholder.com/32',
      title: 'Đã thêm nhà hàng mới',
      date: '12/12/2024 08:20',
      author: 'Nguyễn Văn Đức',
    },
  ];
  return (
    <Box
      sx={{
        minWidth: '200px',
        maxWidth: '800px',
        maxHeight: '800px',
        width: '100%',
        height: '100%',
        p: 2,
        overflow: 'auto',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
        }}
      >
        Hoạt động gần đây
      </Typography>
      <Box>
        {activities.map((activity, index) => (
          <UtilitieActivities activity={activity} key={index} />
        ))}
      </Box>
    </Box>
  );
};

const ListUltilities = ({ items = [], setList, backBtn }) => {
  const [action, setAction] = useState('edit'); // action: [edit, hide, ordering]
  const btnChangeAction = (act) => {
    setAction(action === act ? 'edit' : act);
  };

  const btnHideShow = (id, open, index) => {
    hideShowService({ id, open }).then((response) => {
      if (_.get(response, 'code') === 200) {
        items[index] = _.get(response, 'data');
        setList([...items]);
        toastr.success('Cập nhật thành công');
      }
    });
  };
  return (
    <Fragment>
      <Box display="flex" gap={2}>
        <IconButton onClick={backBtn}>
          <ArrowBackIcon />
        </IconButton>

        <Box display="flex" alignItems="center" flexGrow={1}>
          <Typography component="p" sx={{ fontSize: '18px', color: '#2E3236', fontWeight: 700 }}>
            Danh sách tiện ích
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant={action === 'hide' ? 'contained' : 'outlined'} onClick={() => btnChangeAction('hide')}>
            Ẩn/hiện tiện ích
          </Button>
          <Button variant={action === 'ordering' ? 'contained' : 'outlined'} onClick={() => btnChangeAction('ordering')}>
            Sắp xếp tiện ích
          </Button>
        </Box>
      </Box>
      <Grid container rowSpacing={4} columnSpacing={0} mt={0}>
        {items.map((item, index) => (
          <Grid item key={item._id} sx={{ display: 'flex', justifyContent: 'center' }} xs={3}>
            <UtilitieCard
              key={item._id}
              label={item.name}
              icon={item.icon}
              open={item.open}
              action={action}
              showAction={() => btnHideShow(item._id, 1, index)}
              hideAction={() => btnHideShow(item._id, 0, index)}
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

const UnitContainer = ({ id, backBtn }) => {
  const [list, setList] = useState([]);
  const getList = (serviceCategory) => {
    listService({ serviceCategory }).then((response) => {
      setList(_.get(response, 'data', []));
    });
  };

  useEffect(() => {
    if (id) {
      getList(id);
    }
  }, [id]);
  return (
    <Box p={2} display="flex" gap={2} sx={{ flexWrap: 'wrap' }}>
      <Paper sx={{ p: 2, maxWidth: '800px', minWidth: '600px', maxHeight: '800px', flexGrow: 1 }}>
        <ListUltilities items={list} setList={setList} backBtn={backBtn} />
      </Paper>
      <Paper sx={{ flexGrow: 1 }}>
        <Activitie />
      </Paper>
    </Box>
  );
};

const Manage = ({ id }) => {
  const { user, configs } = useSelector((state) => state);
  const theme = useTheme();
  const [list, setList] = useState([]);
  const [catSelected, setCatSelected] = useState({});
  const getList = () => {
    listCategory({}).then((response) => {
      setList(_.get(response, 'data', []));
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const btnSelectCategory = (item) => {
    setCatSelected(item);
  };
  const backBtn = () => {
    setCatSelected({});
  };

  return (
    <Fragment>
      <Box sx={{ background: '#EEF2F6', py: 1.5, px: 2 }}>
        <Breadcrumbs separator={<i className="icon-linear-arrow-right-1" />} aria-label="breadcrumb">
          <Link underline="hover" key="1" color="#2E3236" to="/digital-utilities">
            Tiện ích
          </Link>
        </Breadcrumbs>
      </Box>
      {_.get(catSelected, '_id') ? (
        <UnitContainer key={_.get(catSelected, '_id')} id={catSelected._id} backBtn={backBtn} />
      ) : (
        <Box p={2} display="flex" flexDirection="column" gap={2}>
          {list.map((item) => (
            <Button key={item._id} variant={item._id === _.get(catSelected, '_id') ? 'contained' : 'text'} onClick={() => btnSelectCategory(item)}>
              {item.title}
            </Button>
          ))}
        </Box>
      )}
    </Fragment>
  );
};

export default Manage;
