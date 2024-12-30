import React from "react";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  useMediaQuery,
  Typography,
} from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";
import HelpSection from "./HelpSection";

// 3rd
import _ from "lodash";

// assets
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
// style constant
const MenuBtn = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: `none`,
  [theme.breakpoints.down("sm")]: {
    ...(!open && {
      display: `block`,
      padding: theme.spacing(1),
      fontSize: "1.5rem",
      overflow: "hidden",
      borderRadius: theme.spacing(1),
    }),
  },
}));
const WrapHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "#007CFE",
  color: "#ffffff",
  display: "flex",
  height: "65px",
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const BoxHidding = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: `block`,
  [theme.breakpoints.down("sm")]: {
    ...(!open && {
      display: `none`,
    }),
  },
}));

// ===========================|| MAIN NAVBAR / HEADER ||=========================== //

const Header = ({ handleLeftDrawerToggle, drawerOpen }) => {
  const theme = useTheme();
  const { user, customization } = useSelector((state) => state);
  const { avatar, fullName } = user;
  return (
    <WrapHeader>
      <BoxContainer>
        <MenuBtn
          variant="text"
          onClick={handleLeftDrawerToggle}
          open={drawerOpen}
        >
          {drawerOpen ? (
            <ClearIcon stroke={1.5} size="1.3rem" />
          ) : (
            <MenuIcon stroke={1.5} size="1.3rem" />
          )}
        </MenuBtn>
        <BoxHidding
          sx={{ p: 1, flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          <Typography variant="h6">Hệ thống quản trị iHaiPhong</Typography>
        </BoxHidding>
      </BoxContainer>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
        <HelpSection />
        {/* notification & profile */}
        <NotificationSection />
        <ProfileSection drawerOpen={drawerOpen} />
      </Box>
    </WrapHeader>
  );
};

export default Header;
