// assets
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import HandshakeIcon from "@mui/icons-material/Handshake"
import SchoolIcon from "@mui/icons-material/School"
import NewspaperIcon from "@mui/icons-material/Newspaper"

const dashboard = {
 id: "category",
 title: "",
 type: "group",
 children: [
  {
   id: "manage-category",
   title: "Danh mục phản ánh",
   type: "item",
   icon: "/images/sidebar/icon-sidebar-user.png",
   url: "/category",
  },
 ],
}

export default dashboard
