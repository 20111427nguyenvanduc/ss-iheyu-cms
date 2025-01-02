/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import history from "../../core/history";
import moment from "moment";
import _ from "lodash";
import ms from "ms";
import toastr from "toastr";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControlLabel,
  IconButton,
  Paper,
  Tooltip,
  Breadcrumbs,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import Link from "../../components/Link";
import DataTable, { createCell, createRows } from "../../ui-component/table/DataTable";
// import Pagination from "../../ui-component/table/Pagination";
import { list } from "../../services/user";
import Search from "../../components/Shared/Search";
import FilterOptions from "../../components/UserManager/FilterOptions";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "16px 32px",
  borderRadius: "12px",
}));

const Manage = () => {
  const { pathname } = history.location;
  const dispatch = useDispatch();
  const { user, configs } = useSelector((state) => state);
  const [filter, updatedFilter] = useState({
    page: 0,
    limit: 10,
    active: "",
    isFilter: false,
    unit: "",
    position: "",
    sort: 1,
    gender: "",
  });
  const setFilter = (newState) => {
    updatedFilter((oldState) => ({ ...oldState, ...newState }));
  };
  const [listData, setListData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  useEffect(() => {
    getList();
  }, [filter]);

  const getList = () => {
    list({
      textSearch,
      ...filter,
    }).then((res) => {
      if (_.get(res, "code") === 200) {
        setListData(_.get(res, "data"));
        setPageCount(_.get(res, "count"));
      }
    });
  };

  return (
    <Fragment>
      <Box sx={{ background: "#EEF2F6", py: 1.5, px: 2 }}>
        <Breadcrumbs
          separator={<i className="icon-linear-arrow-right-1" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" key="1" color="#2E3236" to="/">
            Trang quản trị
          </Link>
          <Typography key="2" sx={{ color: "#007CFE" }}>
            Quản lý thành viên
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ py: 1.5, px: 2, mt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          <Typography variant="h5" sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
            Quản lý thành viên
          </Typography>

          <Link to="/user-manager/add-new-user">
            <Button
              variant="contained"
              size="large"
              sx={{ background: "#007CFE", borderRadius: "12px", textTransform: "inherit" }}
              startIcon={<i className="icon-bold-add-circle" />}
            >
              Thêm thành viên mới
            </Button>
          </Link>
        </Stack>
        <Stack justifyContent="space-between" gap={1} mt={2} direction="row">
          <FilterOptions filter={filter} setFilter={setFilter} />
          <Search
            placeholder={"Tìm kiếm"}
            textSearch={textSearch}
            searchChange={(text) => setTextSearch(text)}
            onSubmit={() => {
              getList();
            }}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataTable
          heads={[
            "STT",
            "Thông tin thành viên",
            "Email",
            "Giới tính",
            "Chức vụ",
            "Đơn vị",
            "Phòng ban",
            "Thao tác",
          ].map((head, i) =>
            createCell(head, {
              sx: {
                width: i == 0 ? "5%" : i == 5 ? "10%" : i == 6 ? "10%" : "auto",
                textAlign: "center",
              },
            })
          )}
          rows={listData.map((item, i) => {
            return createRows([
              <StyledBox>{filter.page * filter.limit + i + 1}</StyledBox>,
              <StyledBox sx={{ justifyContent: "start", flexDirection: "row" }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "flex-start", alignItems: "center" }}
                >
                  <Avatar src={_.get(item, "avatar", item.name)} />
                  <Stack
                    direction="column"
                    spacing={1}
                    sx={{ justifyContent: "center", alignItems: "flex-start" }}
                  >
                    <Typography sx={{ color: "#007CFE", fontSize: "16px" }}>{item.name}</Typography>
                    <Typography sx={{ color: "#143250", fontSize: "16px" }}>
                      {item.phone}
                    </Typography>
                  </Stack>
                </Stack>
              </StyledBox>,
              <StyledBox>{item.email}</StyledBox>,
              <StyledBox>{_.get(item, "gender") === "male" ? "Nam" : "Nữ"}</StyledBox>,
              <StyledBox></StyledBox>,
              <StyledBox></StyledBox>,
              <StyledBox></StyledBox>,
              <StyledBox>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Link to={`${pathname}/${item._id}`}>
                    <Tooltip title="Chỉnh sửa" placement="top">
                      <Avatar sx={{ bgcolor: "#DCF1FF", cursor: "pointer" }}>
                        <i className="icon-linear-edit-2" style={{ color: "#1589D8" }} />
                      </Avatar>
                    </Tooltip>
                  </Link>
                </Box>
              </StyledBox>,
            ]);
          })}
        />
        <Pagination
          color="primary"
          count={pageCount}
          page={filter.page + 1}
          onChange={(e, value) => setFilter({ page: value - 1 })}
          shape="rounded"
        />
      </Box>
    </Fragment>
  );
};

export default Manage;
