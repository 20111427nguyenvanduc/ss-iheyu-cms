// assets
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import HandshakeIcon from "@mui/icons-material/Handshake"
import SchoolIcon from "@mui/icons-material/School"
import NewspaperIcon from "@mui/icons-material/Newspaper"

const dashboard = {
 id: "permission",
 title: "",
 type: "group",
 children: [
  {
   id: "permissions",
   title: "Quản lý quyền hạn",
   type: "collapse",
   icon: "/images/sidebar/icon-sidebar-quyenhan.png",
   children: [
    {
     id: "group-permission",
     title: "Quản lý nhóm quyền",
     type: "item",
     url: "/group-permission",
     icon: "/images/sidebar/icon-sidebar-danhsach.png",
    },
    {
     id: "process-permissions",
     title: "Mô tả quyền hạn",
     type: "item",
     url: "/permissions",
     icon: "/images/sidebar/icon-sidebar-danhsach.png",
    },
   ],
  },
 ],
}

export default dashboard
