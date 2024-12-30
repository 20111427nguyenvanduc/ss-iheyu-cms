/* jslint es6 */
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import history from "../../core/history";
import moment from "moment";
import async from "async";
import _ from "lodash";
import ms from "ms";
import toastr from "toastr";
import { Avatar, Box, Button, Paper, Tooltip, Breadcrumbs, Typography, Stack, Grid, TextField, MenuItem, List, ListItemButton, ListItemIcon, ListItemText, Divider, AppBar, Toolbar, InputAdornment } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "../../components/Link";
import UnitSelected from "../../components/UserManager/UnitSelected";
import DataTable, { createCell, createRows } from "../../ui-component/table/DataTable";
import SearchHeader from "../../ui-component/search/SearchHeader";
import { get, create, update, inactive } from "../../services/user";
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog";
import LoadingSkeleton from "../../ui-component/loading/LoadingSkeleton";
import DatePicker from "../../ui-component/datepicker/DatePicker";
import { list as listUnit } from "../../services/unit";
import { list as listRole } from "../../services/role";
import FilterAddPermission from "../../components/GroupPermission/FilterAddPermission";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CONSTANT from "../../const";
import UploadImgSingle from "../../components/tools/UploadImgSingle";
import UnitSelect from "../../components/UserManager/UnitSelect";
import CakeIcon from "@mui/icons-material/Cake";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "16px 32px",
  borderRadius: "12px",
}));
const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  padding: "16px 32px",
  borderRadius: "12px",
}));

const DetailUser = ({ id }) => {
  const dispatch = useDispatch();
  const { user, configs } = useSelector((state) => state);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [userData, setData] = useState({});
  const [unitsAndPositions, setUnitsAndPositions] = useState([{ unit: null, position: null }]); // Danh sách các phòng ban và chức vụ
  const [permissions, setPermissions] = useState([]);
  const [groupPermissions, setGroupPermissions] = useState([]);
  const setUserData = (newState) => {
    setData((oldState) => ({
      ...oldState,
      ...newState,
    }));
  };

  const getUserInf = (cb) => {
    if (!id || id === "add-new-user") {
      return cb(null, {});
    }
    get({ id }).then((response) => {
      const { data } = response;
      if (_.get(data, "dob")) {
        data.dob = moment(_.get(data, "dob"), "DD MM YYYY");
      }
      cb(null, data || {});
    });
  };

  const initState = () => {
    setLoading(true);
    async.parallel(
      {
        userData: getUserInf,
      },
      (err, objResult) => {
        setData(objResult.userData);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    initState();
  }, [id]);

  const createData = () => {
    setLoadingSave(true);
    create(userData)
      .then((response) => {
        setLoadingSave(false);
        if (_.get(response, "code") === CONSTANT.CODE.SUCCESS) {
          history.push(`/user-manager/${_.get(response, "data")}`);
        }
      })
      .catch(() => {
        setLoadingSave(false);
      });
  };

  const updateData = () => {
    setLoadingSave(true);
    update(userData)
      .then(() => {
        setLoadingSave(false);
      })
      .catch(() => {
        setLoadingSave(false);
      });
  };

  const handleInactive = () => {
    setLoadingSave(true);
    inactive({ id: userData._id })
      .then((res) => {
        setLoadingSave(false);
        history.push("/user-manager");
      })
      .catch(() => {
        setLoadingSave(false);
      });
  };

  return (
    <Fragment>
      <Box sx={{ background: "#EEF2F6", py: 1.5, px: 2 }}>
        <Breadcrumbs separator={<i className="icon-linear-arrow-right-1" />} aria-label="breadcrumb">
          <Link underline="hover" key="1" color="#2E3236" to="/">
            Trang quản trị
          </Link>
          <Link underline="hover" key="1" color="#2E3236" to="/user-manager">
            Quản lý thành viên
          </Link>
          <Typography key="2" sx={{ color: "#007CFE" }}>
            Hồ sơ tài khoản
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ py: 1.5, px: 2, mt: 2 }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
            Thông tin thành viên
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ p: 2 }}>
        {loading ? (
          <LoadingSkeleton loading={loading} variant="rounded" width="100%" height={300} />
        ) : (
          <Fragment>
            <Paper elevation={0}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "start" }}>
                <Box sx={{ background: "#007CFE", padding: "16px", borderRadius: "8px" }} mt={2}>
                  <Avatar src={_.get(userData, "avatar")} sx={{ width: "100px", height: "100px" }} />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h5" sx={{ fontSize: "18px", color: "#010810", fontWeight: 400, display: "flex", alignItems: "center", gap: "4px", mb: 1 }}>
                      Họ tên
                      <Typography component="span" sx={{ color: "#D30500", fontWeight: 500, fontSize: "18px" }}>
                        *
                      </Typography>
                    </Typography>

                    <TextField fullWidth placeholder="Nhập họ tên" variant="outlined" value={_.get(userData, "name", "")} onChange={(e) => setUserData({ name: e.target.value })} inputProps={{ name: "name", ariallabel: "name" }} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h5" sx={{ fontSize: "18px", color: "#010810", fontWeight: 400, mb: 1 }}>
                      Số điện thoại{" "}
                      <Typography component="span" sx={{ color: "#D30500", fontWeight: 500, fontSize: "18px" }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField fullWidth placeholder="Nhập số điện thoại" variant="outlined" value={_.get(userData, "phone", "")} onChange={(e) => setUserData({ phone: e.target.value })} inputProps={{ name: "phone", ariallabel: "phone" }} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h5" sx={{ fontSize: "18px", color: "#010810", fontWeight: 400, mb: 1 }}>
                      Email{" "}
                      <Typography component="span" sx={{ color: "#D30500", fontWeight: 500, fontSize: "18px" }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField fullWidth placeholder="Nhập email" variant="outlined" value={_.get(userData, "email", "")} onChange={(e) => setUserData({ email: e.target.value })} inputProps={{ name: "email", ariallabel: "email" }} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h5" sx={{ fontSize: "18px", color: "#010810", fontWeight: 400, mb: 1 }}>
                      Tài khoản{" "}
                      <Typography component="span" sx={{ color: "#D30500", fontWeight: 500, fontSize: "18px" }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField fullWidth placeholder="Nhập tài khoản" variant="outlined" value={_.get(userData, "username", "")} onChange={(e) => setUserData({ username: e.target.value })} inputProps={{ name: "username", ariallabel: "username" }} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h5" sx={{ fontSize: "18px", color: "#010810", fontWeight: 400, mb: 1 }}>
                      Giới tính{" "}
                      <Typography component="span" sx={{ color: "#D30500", fontWeight: 500, fontSize: "18px" }}>
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      select
                      sx={{
                        "& .MuiSelect-select span::before": {
                          content: "'Chọn giới tính'",
                        },
                      }}
                      variant="outlined"
                      value={_.get(userData, "gender", "")}
                      onChange={(e) => setUserData({ gender: e.target.value })}
                      inputProps={{ name: "gender", ariallabel: "gender" }}
                    >
                      {[
                        { label: "Nam", code: "male" },
                        { label: "Nữ", code: "female" },
                      ].map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h5" sx={{ fontSize: "18px", color: "#010810", fontWeight: 400, mb: 1 }}>
                      Ngày sinh{" "}
                      <Typography component="span" sx={{ color: "#D30500", fontWeight: 500, fontSize: "18px" }}>
                        *
                      </Typography>
                    </Typography>
                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      toolbarFormat="DD/MM/YYYY"
                      value={_.get(userData, "dob")}
                      onChange={(newValue) => {
                        setUserData({ dob: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} form="form_update" fullWidth />}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Paper>

            <Divider sx={{ borderColor: "#CCCFD3", height: "2px", margin: "24px 0" }} />

            <UnitSelect unitsAndPositions={unitsAndPositions} setUnitsAndPositions={setUnitsAndPositions} permissions={permissions} setPermissions={setPermissions} groupPermissions={groupPermissions} setGroupPermissions={setGroupPermissions} />
          </Fragment>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <FilterAddPermission permissions={permissions} setPermissions={setPermissions} groupPermissions={groupPermissions} setGroupPermissions={setGroupPermissions} />
      </Box>
      <AppBar position="sticky" color="primary" sx={{ top: "auto", bottom: 0, boxShadow: "0px -5px 4px 0px #7E7E7E26", background: "#FFF" }}>
        <Toolbar sx={{ gap: 2, p: 2 }}>
          <Button
            onClick={_.get(userData, "_id") ? createData : updateData}
            variant="contained"
            size="large"
            sx={{
              padding: "12px  32px",
              background: "#007CFE",
              borderRadius: "12px",
              textTransform: "inherit",
              color: "#FFF",

              "&:hover": { backgroundColor: "#007CFE", color: "#FFF" },
            }}
          >
            {_.get(userData, "_id") ? "Cập nhật thông tin" : "Thêm thành viên"}
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default DetailUser;
