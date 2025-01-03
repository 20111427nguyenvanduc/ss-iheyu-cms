/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";

const Activitie = ({ activity }) => {
  return (
    <Fragment>
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Avatar src={activity.imgSrc} alt="Frame" sx={{ width: 32, height: 32 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "medium",
              color: "text.secondary",
              lineHeight: "22.4px",
            }}
          >
            {activity.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.disabled",
              lineHeight: "19.6px",
            }}
          >
            {activity.date} {activity.author}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Fragment>
  );
};

export default Activitie;
