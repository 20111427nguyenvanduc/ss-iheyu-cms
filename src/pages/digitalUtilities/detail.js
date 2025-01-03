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

const Activities = () => {
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
          <UtilityActivities activity={activity} key={index} />
        ))}
      </Box>
    </Box>
  );
};

const ListUltilities = ({ items = [], setList, backBtn }) => {
  const [action, setAction] = useState('edit'); // action: [edit, hide, ordering]
  const [editUtility, setEditUtility] = useState();
  const toggleAction = (act) => {
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

  const toggOrdering = () => {
    toggleAction('ordering');
  };

  const btnOrderingSave = () => {
    const orders = items.map(({ _id, order }) => ({ id: _id, order }));
    orderingService({ orders }).then((response) => {
      if (_.get(response, 'code') === 200) {
        toastr.success('Lưu sắp xếp thành công');
        toggOrdering();
      }
    });
  };

  const btnEdit = (item) => {
    setEditUtility(item);
  };

  const onClickService = (item) => {
    const { link, _id } = item;
    history.push(`/${link}/${_id}`);
  };

  const isShowHide = action === 'hide';
  const isOrdered = action === 'ordering';
  items.map((item) => console.log({ [item.link]: item.name }));

  return (
    <Fragment>
      <Box display="flex" gap={2}>
        <Link to="/app-manager">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>

        <Box display="flex" alignItems="center" flexGrow={1}>
          <Typography component="p" sx={{ fontSize: '18px', color: '#2E3236', fontWeight: 700 }}>
            Danh sách tiện ích
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant={isShowHide ? 'contained' : 'outlined'} onClick={() => toggleAction('hide')} startIcon={<VisibilityIcon />}>
            {isShowHide ? 'Đang ẩn/hiện' : 'Ẩn tiện ích'}
          </Button>
          <Button variant={isOrdered ? 'contained' : 'outlined'} onClick={isOrdered ? btnOrderingSave : toggOrdering} startIcon={<ChangeCircleIcon />}>
            {isOrdered ? 'Lưu sắp xếp' : 'Sắp xếp'}
          </Button>
        </Box>
      </Box>
      <Box pt={2}>
        <ListManager
          items={items}
          setItems={setList}
          isOrdered={isOrdered}
          renderItem={(item) => (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <UtilityCard
                key={item._id}
                label={item.name}
                icon={item.icon}
                open={item.open}
                action={action}
                showAction={(e) => {
                  e.stopPropagation();
                  btnHideShow(item._id, 1, _.indexOf(items, item, 0));
                }}
                hideAction={(e) => {
                  e.stopPropagation();
                  btnHideShow(item._id, 0, _.indexOf(items, item, 0));
                }}
                editAction={(e) => {
                  e.stopPropagation();
                  btnEdit(item);
                }}
                onClick={() => onClickService(item)}
              />
            </Box>
          )}
        />
      </Box>
      <EditUtility
        utility={editUtility}
        setUtility={setEditUtility}
        onSuccess={(newUtility) => {
          const index = _.findIndex(items, (it) => it._id === newUtility._id);
          items[index] = newUtility;
          setList([...items]);
          setEditUtility(null);
        }}
      />
    </Fragment>
  );
};

const UnitContainer = ({ id, backBtn }) => {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState({});
  const getList = (serviceCategory) => {
    listService({ serviceCategory }).then((response) => {
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
          <Typography key="2" sx={{ color: '#007CFE' }}>
            {_.get(info, 'title', '') || 'Quản lý tiện ích'}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box p={2} display="flex" gap={2} sx={{ flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, width: '672px', maxHeight: '800px', flexGrow: 1 }}>
          <ListUltilities items={list} setList={setList} backBtn={backBtn} />
        </Paper>
        <Paper sx={{ flexGrow: 1 }}>
          <Activities />
        </Paper>
      </Box>
    </Fragment>
  );
};

export default UnitContainer;
