/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import moment from "moment";
import _ from "lodash";
import ms from "ms";
import toastr from "toastr";
import {
  Button,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { list as listGroupPermission } from "../../services/groupPermission";
import LoadingSkeleton from "../../ui-component/loading/LoadingSkeleton";

const FilterAddPermission = ({
  permissions,
  setPermissions,
  groupPermissions,
  setGroupPermissions,
}) => {
  const [dataGroup, setDataGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListGroupPermissions = () => {
    listGroupPermission({}).then((res) => {
      if (_.get(res, "code") === 200) {
        setDataGroup(_.get(res, "data"));
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getListGroupPermissions();
  }, []);

  const handleCheckGroupPermission = (group) => {
    if (!group || !Array.isArray(group.permissions)) {
      return;
    }
    let groupId = _.get(group, "_id");
    const isChecked = groupPermissions.includes(groupId);
    const groupPermissionIds = group.permissions.map((perm) => perm._id);

    if (isChecked) {
      // Bỏ tick nhóm quyền
      setGroupPermissions(groupPermissions.filter((id) => id !== groupId));
      setPermissions(permissions.filter((id) => !groupPermissionIds.includes(id)));
    } else {
      // Tick nhóm quyền
      setGroupPermissions([...groupPermissions, groupId]);
      setPermissions([...new Set([...permissions, ...groupPermissionIds])]);
    }
  };

  // Xử lý tick/untick quyền con
  const handleCheckPermission = (permissionId, group) => {
    if (!group || !Array.isArray(group.permissions)) {
      return;
    }
    const isChecked = permissions.includes(permissionId);
    let groupId = _.get(group, "_id");
    if (isChecked) {
      // Bỏ tick quyền con
      setPermissions(permissions.filter((id) => id !== permissionId));
      // Kiểm tra nếu 1 quyền con đã bị bỏ tick => bỏ tick nhóm quyền
      setGroupPermissions(groupPermissions.filter((id) => id !== groupId));
    } else {
      // Tick quyền con
      setPermissions([...permissions, permissionId]);
      // Kiểm tra nếu tất cả quyền con đã được tick => tick nhóm quyền
      if (group.permissions.every((perm) => [...permissions, permissionId].includes(perm._id))) {
        setGroupPermissions([...groupPermissions, groupId]);
      }
    }
  };

  return loading ? (
    <LoadingSkeleton loading={loading} variant="rounded" width="100%" height={300} />
  ) : (
    <Box sx={{ border: "1px solid #CCCFD3", borderRadius: "12px", width: "100%" }} p={2}>
      <Typography variant="p" sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
        Danh sách các quyền
      </Typography>
      <Grid item xs={12} mt={2}>
        {dataGroup.map((group, i) => {
          return (
            <Box key={i}>
              <FormControlLabel
                sx={{ width: "100%", py: 1 }}
                key={group._id}
                control={
                  <Checkbox
                    value={group._id}
                    onChange={() => handleCheckGroupPermission(group)}
                    checked={groupPermissions.includes(group._id)}
                  />
                }
                label={
                  <Typography
                    variant="p"
                    sx={{ fontSize: "20px", color: "#2E3236", fontWeight: 700 }}
                  >
                    {group.name}
                  </Typography>
                }
              />
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {group.permissions && group.permissions.length
                    ? group.permissions.map((permission, index) => (
                        <Grid item xs={3} key={index}>
                          <FormControlLabel
                            key={permission.id}
                            control={
                              <Checkbox
                                value={permission._id}
                                onChange={() => handleCheckPermission(permission._id, group)}
                                checked={permissions.includes(permission._id)}
                              />
                            }
                            label={permission.name}
                          />
                        </Grid>
                      ))
                    : null}
                </Grid>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FilterAddPermission;
