// assets
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import HandshakeIcon from "@mui/icons-material/Handshake"
import SchoolIcon from "@mui/icons-material/School"
import NewspaperIcon from "@mui/icons-material/Newspaper"

const dashboard = {
 id: "manager",
 title: "Quản lý hệ thống",
 type: "group",
 children: [
  {
   id: "manager-user",
   title: "Quản lý tài khoản",
   type: "item",
   url: "/user-manager",
   icon: ManageAccountsIcon,
//    role: [""],
  },
 ],
}

export default dashboard
