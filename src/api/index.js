import AuthenticateHandle from "./authenticate"
import GroupPermissionHandle from "./groupPermission"
import PermissionHandle from "./permission"
import RoleHandle from "./role"
import UnitHandle from "./unit"
import UserHandle from "./user"

//authenticate
app.post("/login", AuthenticateHandle.login)
app.get("/logout", AuthenticateHandle.logout)
app.post("/user-inf", AuthenticateHandle.userInf)

//groupPermission
app.post("/admin/group-permission/list", GroupPermissionHandle.list)
app.post("/admin/group-permission/create", GroupPermissionHandle.create)
app.post("/admin/group-permission/update", GroupPermissionHandle.update)
app.post("/admin/group-permission/inactive", GroupPermissionHandle.inactive)

//permission
app.post("/admin/permission/list", PermissionHandle.list)
app.post("/admin/permission/create", PermissionHandle.create)
app.post("/admin/permission/update", PermissionHandle.update)
app.post("/admin/permission/inactive", PermissionHandle.inactive)

//role
app.post("/admin/role/list", RoleHandle.list)
app.post("/admin/role/create", RoleHandle.create)
app.post("/admin/role/update", RoleHandle.update)
app.post("/admin/role/inactive", RoleHandle.inactive)

//unit
app.post("/admin/role/list", UnitHandle.list)
app.post("/admin/role/create", UnitHandle.create)
app.post("/admin/role/update", UnitHandle.update)
app.post("/admin/role/inactive", UnitHandle.inactive)

//user
app.post("/admin/user/list", UserHandle.list)
app.post("/admin/user/create", UserHandle.create)
app.post("/admin/user/update", UserHandle.update)
app.post("/admin/user/inactive", UserHandle.inactive)
