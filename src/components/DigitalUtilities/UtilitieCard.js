import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

const Frame = ({ icon, ...props }) => {
  return (
    <Box
      sx={{
        width: 136,
        height: 183,
        bgcolor: "white",
        borderRadius: 2,
        border: 1,
        borderColor: "grey.300",
        position: "relative",
      }}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#E5F1FF",
          borderRadius: "50%",
          width: 36,
          height: 36,
          cursor: "pointer",
          position: "absolute",
          top: -10,
          right: -10,
          cursor: "pointer",
        }}
      >
        <IconButton
          sx={{
            width: 36,
            height: 36,
            color: "primary.main",
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: 134,
          height: 128,
          p: "16px 20px",
        }}
      >
        <Box
          component="img"
          src={icon}
          alt="Frame"
          sx={{
            width: 96,
            height: 96,
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{ p: "0px 16px" }}>
        <Typography
          component="p"
          sx={{
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Y tế
        </Typography>
      </Box>
    </Box>
  );
};

export default Frame;
