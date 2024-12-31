// assets
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import HandshakeIcon from "@mui/icons-material/Handshake"
import SchoolIcon from "@mui/icons-material/School"
import NewspaperIcon from "@mui/icons-material/Newspaper"

const dashboard = {
 id: "user",
 title: "",
 type: "group",
 children: [
  {
   id: "users",
   title: "Quản lý người dùng",
   type: "item",
   icon: "/images/sidebar/icon-sidebar-user.png",
   url: "/users",
  },
 ],
}

export default dashboard
