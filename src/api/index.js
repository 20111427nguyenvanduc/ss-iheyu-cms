import AuthenticateHandle from "./authenticate";
import GroupPermissionHandle from "./groupPermission";
import PermissionHandle from "./permission";
import RoleHandle from "./role";
import UnitHandle from "./unit";
import UserHandle from "./user";
import PositionHandle from "./position";
import CategoryHandle from "./category";
import CategoryPermissionHandle from "./categoryPermission";
import PetitionHandle from "./petition";
import MediaHandle from "./media";
import ServicesHandle from "./services";

//authenticate
app.post("/login", AuthenticateHandle.login);
app.get("/logout", AuthenticateHandle.logout);
app.post("/user-inf", UserHandle.userInf);
app.post("/forgot-password/send-otp", UserHandle.sendOTPForgotPassword);
app.post("/forgot-password/check-otp", UserHandle.checkOTPForgotPassword);

//groupPermission
app.post("/admin/group-permission/list", GroupPermissionHandle.list);
app.post("/admin/group-permission/create", GroupPermissionHandle.create);
app.post("/admin/group-permission/update", GroupPermissionHandle.update);
app.post("/admin/group-permission/inactive", GroupPermissionHandle.inactive);

//permission
app.post("/admin/permission/list", PermissionHandle.list);
app.post("/admin/permission/create", PermissionHandle.create);
app.post("/admin/permission/update", PermissionHandle.update);
app.post("/admin/permission/inactive", PermissionHandle.inactive);

//role
app.post("/admin/role/list", RoleHandle.list);
app.post("/admin/role/create", RoleHandle.create);
app.post("/admin/role/update", RoleHandle.update);
app.post("/admin/role/inactive", RoleHandle.inactive);

//unit
app.post("/admin/unit/list", UnitHandle.list);
app.post("/admin/unit/create", UnitHandle.create);
app.post("/admin/unit/update", UnitHandle.update);
app.post("/admin/unit/inactive", UnitHandle.inactive);
app.post("/admin/unit/list-level", UnitHandle.listLevel);
app.post("/admin/unit/get", UnitHandle.get);

//user
app.post("/admin/user/list", UserHandle.list);
app.post("/admin/user/create", UserHandle.create);
app.post("/admin/user/update", UserHandle.update);
app.post("/admin/user/inactive", UserHandle.inactive);
app.post("/admin/user/get", UserHandle.get);
app.post("/admin/user/grant-permisstion", UserHandle.grantPermisstion);

//position
app.post("/admin/position/list", PositionHandle.list);
app.post("/admin/position/create", PositionHandle.create);
app.post("/admin/position/update", PositionHandle.update);
app.post("/admin/position/inactive", PositionHandle.inactive);
app.post("/admin/position/get", PositionHandle.get);

//category
app.post("/admin/category/list", CategoryHandle.list);
app.post("/admin/category/create", CategoryHandle.create);
app.post("/admin/category/update", CategoryHandle.update);
app.post("/admin/category/inactive", CategoryHandle.inactive);

//category-permission
app.post("/admin/category-permission/list", CategoryPermissionHandle.list);

//petition
app.post("/admin/petition/create", PetitionHandle.create);
app.post("/admin/petition/list", PetitionHandle.list);
app.post("/admin/petition/list-category", PetitionHandle.listCategory);
app.post("/admin/petition/list-community", PetitionHandle.listCommunity);
app.post("/admin/petition/update", PetitionHandle.update);
app.post("/admin/petition/get", PetitionHandle.get);

//media
app.post("/media/upload-single", multipartMiddleware, MediaHandle.uploadSingle);
app.post("/media/decline-file", MediaHandle.declineFile);

//services
app.post("/admin/services/list-category", ServicesHandle.listCategory);
app.post("/admin/services/list", ServicesHandle.listService);
app.post("/admin/services/list-service-children", ServicesHandle.listServiceChildren);
