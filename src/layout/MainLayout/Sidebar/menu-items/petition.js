// assets
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import HandshakeIcon from "@mui/icons-material/Handshake"
import SchoolIcon from "@mui/icons-material/School"
import NewspaperIcon from "@mui/icons-material/Newspaper"

const dashboard = {
 id: "petition",
 title: "",
 type: "group",
 children: [
  {
   id: "petitions",
   title: "Phản ánh kiến nghị",
   type: "collapse",
   icon: "/images/sidebar/icon-sidebar-phananh.png",
   children: [
    {
     id: "manage-petition",
     title: "Danh sách phản ánh",
     type: "item",
     url: "/petition",
     icon: "/images/sidebar/icon-sidebar-danhsach.png",
    },
    {
     id: "process-petition",
     title: "Xử lý phản ánh",
     type: "item",
     url: "/petition/process",
     icon: "/images/sidebar/icon-sidebar-danhsach.png",
    },
   ],
  },
 ],
}

export default dashboard