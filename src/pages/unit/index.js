/* jslint es6 */
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';
import ms from 'ms';
import toastr from 'toastr';
import { Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Grid, Breadcrumbs, Typography, Stack } from '@mui/material';
import Link from '../../components/Link';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DataTable, { createCell, createRows } from '../../ui-component/table/DataTable';
import SearchHeader from '../../ui-component/search/SearchHeader';
import AddEditUnit from '../../components/Unit/AddEditUnit';
import AddEditPosition from '../../components/Unit/AddEditPosition';
import { list, get as getUnit } from '../../services/unit';
import { list as listPosition } from '../../services/position';
import AlertDialogDelete from '../../ui-component/dialog/AlertDialog';
import { Height } from '@mui/icons-material';

const VectorLeft = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderTop: '1px solid #000000',
  borderLeft: '1px solid #000000',
  bottom: '-16px',
  left: '-100px',
  width: '100px',
  height: '50px',
}));

const VectorRight = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderTop: '1px solid #000000',
  borderRight: '1px solid #000000',
  bottom: '-16px',
  right: '-100px',
  width: '100px',
  height: '50px',
}));
const VectorConnect = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderTop: '1px solid #000000',
  borderLeft: '1px solid #000000',
  borderBottom: '1px solid #000000',
  top: `calc(-50% - ${theme.spacing(2)})`,
  left: '-30px',
  width: '30px',
  height: `calc(${theme.spacing(2)} + 100% + 3px)`,
}));

const TextName = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  color: '#2E3236',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '300px',
}));

const Manage = ({ id }) => {
  const dispatch = useDispatch();
  const { user, configs } = useSelector((state) => state);
  const { region, regions } = configs;
  const setFilter = (newState) => {};
  const [filter, updatedFilter] = useState({
    page: 0,
    limit: 20,
    status: '',
    type: '',
    region: region,
    orderType: '',
    searchWithFilter: false,
    sortBy: '-updatedAt',
    filterTime24h: false,
  });
  const [listData, setListData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [unitCurrent, setUnitCurrent] = useState(null);

  const [listDataPosition, setListDataPosition] = useState([]);
  //Đoạn này đang làm memory leak cần xử lý bằng 1 func async
  useEffect(() => {
    if (id) {
      getDetailUnit();
    } else {
      getParentCurrent();
    }
  }, [id]);

  useEffect(() => {
    if (unitCurrent) {
      getList();
      getListPosition();
    }
  }, [unitCurrent]);
  //Đoạn này đang làm memory leak

  const getParentCurrent = () => {
    list({}).then((res) => {
      if (_.get(res, 'code') === 200) {
        let data = _.get(res, 'data', []);
        if (data.length) {
          setUnitCurrent(data[0]);
        }
      }
    });
  };

  const getDetailUnit = () => {
    getUnit({ _id: id }).then((res) => {
      if (_.get(res, 'code') === 200) {
        let data = _.get(res, 'data');
        setUnitCurrent(data);
      }
    });
  };

  const getList = () => {
    list({ parent: _.get(unitCurrent, '_id') }).then((res) => {
      if (_.get(res, 'code') === 200) {
        let data = _.get(res, 'data', []);
        setListData(data);
      }
    });
  };

  const getListPosition = () => {
    listPosition({ unit: _.get(unitCurrent, '_id') }).then((res) => {
      if (_.get(res, 'code') === 200) {
        let data = _.get(res, 'data', []);
        setListDataPosition(data);
      }
    });
  };

  return (
    <Fragment>
      <Box sx={{ background: '#EEF2F6', py: 1.5, px: 2 }}>
        <Breadcrumbs separator={<i className="icon-linear-arrow-right-1" />} aria-label="breadcrumb">
          <Link underline="hover" key="1" color="#2E3236" to="/unit">
            Quản lý đơn vị
          </Link>
          {_.get(unitCurrent, 'parentPath', []).map((path) => {
            return (
              <Link underline="hover" key={path._id} color="#2E3236" to={'/unit/' + path._id}>
                {_.get(path, 'name')}
              </Link>
            );
          })}
          <Typography key="2" sx={{ color: '#007CFE', fontWeight: 600 }}>
            {_.get(unitCurrent, 'name')}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ py: 1.5, px: 2, mt: 2 }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          {_.get(unitCurrent, 'parent') ? (
            <Link underline="none" color="#2E3236" to={'/unit/' + _.get(unitCurrent, 'parent._id')}>
              <i className="icon-linear-arrow-left" style={{ fontSize: '22px' }} />
            </Link>
          ) : null}
          <Typography variant="p" sx={{ fontSize: '22px', color: '#2E3236', fontWeight: 700 }}>
            {_.get(unitCurrent, 'name')}
          </Typography>
        </Stack>
      </Box>

      <Box p={2}>
        <Grid container spacing={2} sx={{ maxWidth: '1200px', margin: 'auto' }}>
          <Grid item sm={12}>
            <Box display={'flex'} justifyContent={'center'}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  border: '1px solid #007CFE',
                  width: 'fit-content',
                  padding: '12px 32px',
                  gap: 2,
                  borderRadius: '32px',
                  position: 'relative',
                }}
              >
                <VectorLeft />
                <Avatar alt="Remy Sharp" src={_.get(unitCurrent, 'icon')} />
                <Typography variant="p" sx={{ fontSize: '22px', color: '#2E3236', fontWeight: 700 }}>
                  {_.get(unitCurrent, 'name')}
                </Typography>
                <AddEditUnit onClose={getList} unitCurrent={{}} detail={unitCurrent}>
                  <i className="icon-bold-edit-2" style={{ color: '#007CFE', fontSize: '22px', cursor: 'pointer' }} />
                </AddEditUnit>
                <VectorRight />
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '500px',
                  padding: '18px 32px',
                  borderRadius: '32px',
                  background: '#F6F5FC',
                }}
              >
                <Typography variant="p" sx={{ fontSize: '22px', color: '#2E3236', fontWeight: 700 }}>
                  Đơn vị trực thuộc
                </Typography>
              </Stack>

              {listData.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '500px',
                      padding: '12px 32px',
                      borderRadius: '32px',
                      border: '1px solid #656C75',
                      position: 'relative',
                    }}
                  >
                    <VectorConnect />
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar alt={item.name} src={_.get(item, 'icon')} />
                        <TextName component="p">{item.name}</TextName>
                      </Stack>
                      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', alignItems: 'center', cursor: 'pointer' }}>
                        <Link to={'/unit/' + _.get(item, '_id')}>
                          <i className="icon-bold-eye" style={{ color: '#007CFE', fontSize: '22px' }} />
                        </Link>
                        <AddEditUnit onClose={getList} unitCurrent={unitCurrent} detail={item}>
                          <i className="icon-bold-edit-2" style={{ color: '#007CFE', fontSize: '22px', cursor: 'pointer' }} />
                        </AddEditUnit>
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}

              <Box p={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <AddEditUnit onClose={getList} unitCurrent={unitCurrent} />
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '500px',
                  padding: '18px 32px',
                  borderRadius: '32px',
                  background: '#F6F5FC',
                }}
              >
                <Typography variant="p" sx={{ fontSize: '22px', color: '#2E3236', fontWeight: 700 }}>
                  Các chức vụ
                </Typography>
              </Stack>

              {listDataPosition.map((item, i) => {
                return (
                  <Link underline="hover" key={i} color="#2E3236" to={'/position/' + item._id}>
                    <Box
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '500px',
                        padding: '12px 32px',
                        borderRadius: '32px',
                        border: '1px solid #656C75',
                        position: 'relative',
                      }}
                    >
                      <VectorConnect />
                      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                          <Avatar sx={{ background: '#FFF' }} alt={item.name} src={''} />
                          <TextName component="p">{item.name}</TextName>
                        </Stack>
                        <i className="icon-linear-arrow-right-1" style={{ color: '#007CFE', fontSize: '22px' }} />
                      </Stack>
                    </Box>
                  </Link>
                );
              })}

              <Box p={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <AddEditPosition onClose={getListPosition} unitCurrent={unitCurrent} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Manage;
