// assets
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import HandshakeIcon from "@mui/icons-material/Handshake"
import SchoolIcon from "@mui/icons-material/School"
import NewspaperIcon from "@mui/icons-material/Newspaper"

const dashboard = {
 id: "anaytic",
 title: "",
 type: "group",
 children: [
  {
   id: "manage-anaytic",
   title: "Thống kê",
   type: "collapse",
   icon: "/images/sidebar/icon-sidebar-thongke.png",
   children: [
    {
     id: "anaytic-overview",
     title: "Tổng quan",
     type: "item",
     url: "/anaytic",
     icon: "/images/sidebar/icon-sidebar-danhsach.png",
    },
    {
     id: "anaytic-unit",
     title: "Đơn vị xử lý",
     type: "item",
     url: "/anaytic/unit",
     icon: "/images/sidebar/icon-sidebar-danhsach.png",
    },
    {
     id: "anaytic-category",
     title: "Đơn vị xử lý",
     type: "item",
     url: "/anaytic/category",
     icon: "/images/sidebar/icon-sidebar-danhsach.png",
    },
   ],
  },
 ],
}

export default dashboard
