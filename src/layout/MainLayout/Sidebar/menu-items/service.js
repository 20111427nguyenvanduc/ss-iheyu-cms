// assets
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SchoolIcon from "@mui/icons-material/School";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const dashboard = {
  id: "service-groups",
  title: "",
  type: "group",
  children: [
    {
      id: "services",
      title: "Quản lý tiện ích",
      type: "collapse",
      icon: "/images/sidebar/icon-sidebar-tienich.png",
      children: [
        {
          id: "services1",
          title: "Tiện ích 1",
          type: "item",
          url: "/",
          icon: "/images/sidebar/icon-sidebar-danhsach.png",
        },
      ],
    },
  ],
};

export default dashboard;
