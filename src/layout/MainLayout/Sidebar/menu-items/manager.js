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
  {
   id: "unit",
   title: "Quản lý đơn vị",
   type: "item",
   url: "/unit",
   icon: ManageAccountsIcon,
   //    role: [""],
  },

  {
   id: "grouppermission",
   title: "Quản lý quyền hạn",
   type: "collapse",
   icon: ManageAccountsIcon,
   children: [
    {
     id: "permissions",
     title: "Mô tả quyền hạn",
     type: "item",
     url: "/permissions",
     icon: ManageAccountsIcon,
    },
    {
     id: "group-permission",
     title: "Quản lý nhóm quyền",
     type: "item",
     url: "/group-permission",
     icon: ManageAccountsIcon,
    },
   ],
  },
  {
   id: "category",
   title: "Danh mục phản ánh",
   type: "item",
   url: "/category",
   icon: ManageAccountsIcon,
   //    role: [""],
  },
 ],
}

export default dashboard
