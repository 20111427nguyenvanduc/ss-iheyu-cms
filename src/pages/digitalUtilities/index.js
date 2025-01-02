/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import moment from "moment";
import _ from "lodash";
import ms from "ms";
import toastr from "toastr";
import {
  Avatar,
  AppBar,
  Tabs,
  Tab,
  Box,
  Button,
  Divider,
  Paper,
  Grid,
  Breadcrumbs,
  Typography,
  Stack,
} from "@mui/material";

import Link from "../../components/Link";
import UtilitieCard from "../../components/DigitalUtilities/UtilitieCard";
import UtilitieActivities from "../../components/DigitalUtilities/UtilitieActivities";

const Activitie = () => {
  const activities = [
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
    {
      imgSrc: "https://via.placeholder.com/32",
      title: "Đã thêm nhà hàng mới",
      date: "12/12/2024 08:20",
      author: "Nguyễn Văn Đức",
    },
  ];
  return (
    <Box
      sx={{
        minWidth: "200px",
        maxWidth: "800px",
        maxHeight: "800px",
        width: "100%",
        height: "100%",
        p: 2,
        overflow: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
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

const ListUltilities = () => {
  return (
    <Fragment>
      <Box display="flex" gap={2}>
        <Typography
          variant="p"
          flexGrow={1}
          sx={{ fontSize: "18px", color: "#2E3236", fontWeight: 700 }}
        >
          Danh sách tiện ích
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined">Ẩn tiện ích</Button>
          <Button variant="outlined">Sắp xếp tiện ích</Button>
        </Box>
      </Box>
      <Grid container rowSpacing={4} columnSpacing={0} mt={0}>
        <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={3}>
          <UtilitieCard icon="images/utilities/y-te.png" />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const UnitContainer = () => {
  return (
    <Box p={2} display="flex" gap={2} sx={{ flexWrap: "wrap" }}>
      <Paper sx={{ p: 2, maxWidth: "800px", minWidth: "600px", maxHeight: "800px", flexGrow: 1 }}>
        <ListUltilities />
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

  return (
    <Fragment>
      <Box sx={{ background: "#EEF2F6", py: 1.5, px: 2 }}>
        <Breadcrumbs
          separator={<i className="icon-linear-arrow-right-1" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" key="1" color="#2E3236" to="/digital-utilities">
            Tiện ích
          </Link>
        </Breadcrumbs>
      </Box>

      <UnitContainer />
    </Fragment>
  );
};

export default Manage;
