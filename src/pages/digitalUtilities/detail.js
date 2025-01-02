/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import moment from "moment";
import _ from "lodash";
import ms from "ms";
import toastr from "toastr";
import { Box, Button, Paper, Grid, Breadcrumbs, Typography, Stack } from "@mui/material";
import Link from "../../components/Link";

const Detail = ({ id }) => {
  const { user, configs } = useSelector((state) => state);

  return (
    <Fragment>
      <Box sx={{ background: "#EEF2F6", py: 1.5, px: 2 }}>
        <Breadcrumbs
          separator={<i className="icon-linear-arrow-right-1" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" key="1" color="#2E3236" to="/digital-utilities">
            Tiện ích số
          </Link>
        </Breadcrumbs>
      </Box>
      <Box p={2}>
        <Paper sx={{ width: "800px", height: "800px" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Detail;
