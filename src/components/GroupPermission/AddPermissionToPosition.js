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
  Dialog,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Grid,
  Checkbox,
  Divider,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { list as listPermission } from "../../services/permission";
import Search from "../Shared/Search";

const AddPermissionToPosition = ({
  children,
  permissionsCurrent,
  onClose = () => {},
  dataPermission = [],
  textSearch,
  setTextSearch,
  onSubmitSearch = () => {},
}) => {
  const [open, setOpen] = React.useState(false);

  const [permissions, setPermissions] = useState([]);

  const [listCategoryPermission, setListCategoryPermission] = useState([]);

  useEffect(() => {
    setPermissions(permissionsCurrent);
  }, [permissionsCurrent]);

  useEffect(() => {
    setListCategoryPermission(groupByCategoryPermission(dataPermission));
  }, [dataPermission]);

  const groupByCategoryPermission = (array) => {
    const grouped = array.reduce((acc, item) => {
      const categoryId = _.get(item, "categoryPermission._id"); // Lấy _id của categoryPermission
      if (categoryId) {
        // Nếu nhóm đã tồn tại, thêm item vào nhóm
        if (!acc[categoryId]) {
          acc[categoryId] = {
            category: item.categoryPermission,
            items: [],
          };
        }
        acc[categoryId].items.push(item);
      }
      return acc;
    }, {});

    // Chuyển đối tượng thành mảng
    return Object.values(grouped);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckPermission = (permission) => {
    const isChecked = findIdInArray(permissions, _.get(permission, "_id"));
    if (isChecked) {
      // Bỏ tick nhóm quyền
      setPermissions(permissions.filter((item) => item._id !== _.get(permission, "_id")));
    } else {
      // Tick nhóm quyền
      setPermissions([...permissions, permission]);
    }
  };

  const findIdInArray = (array, idToFind) => {
    return array.some((item) => item._id === idToFind);
  };

  const areArraysEqualById = (array1, array2) => {
    const ids1 = array1.map((item) => item._id).sort(); // Lấy danh sách _id và sắp xếp
    const ids2 = array2.map((item) => item._id).sort(); // Lấy danh sách _id và sắp xếp

    // So sánh từng phần tử trong mảng _id
    return ids1.length === ids2.length && ids1.every((id, index) => id === ids2[index]);
  };

  return (
    <React.Fragment>
      {React.cloneElement(
        children || (
          <Button
            variant="contained"
            size="large"
            sx={{ background: "#007CFE", borderRadius: "12px", textTransform: "inherit" }}
            startIcon={<i className="icon-bold-add-circle" />}
          >
            Thêm mới
          </Button>
        ),
        { onClick: handleClickOpen }
      )}
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        PaperProps={{ sx: { borderRadius: "16px" } }}
      >
        <DialogTitle>
          <Stack
            direction="row"
            spacing={6}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="p" sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
              Danh sách quyền hạn
            </Typography>
            <Search
              placeholder={"Tìm quyền hạn"}
              textSearch={textSearch}
              searchChange={(text) => setTextSearch(text)}
              onSubmit={() => {
                onSubmitSearch();
              }}
            />
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          {listCategoryPermission.map((cat, index) => (
            <Box
              sx={{ background: "#F6F5FC", padding: "16px", borderRadius: "16px" }}
              mt={index ? 2 : 1}
            >
              <Typography variant="p" sx={{ fontSize: "20px", color: "#2E3236", fontWeight: 600 }}>
                {_.get(cat, "category.name")}
              </Typography>
              <Grid container spacing={2} mt={0.5}>
                {_.get(cat, "items", []).map((permission, i) => {
                  return (
                    <Grid item key={i}>
                      <Box
                        display={"flex"}
                        flexDirection="column"
                        px={2}
                        py={0.5}
                        gap={1.5}
                        mt={1}
                        sx={{
                          background: "#FFF",
                          border: !findIdInArray(permissions, permission._id)
                            ? "1px solid #CCCFD3"
                            : "1px solid #007CFE",
                          borderRadius: "12px",
                        }}
                      >
                        <Box>
                          <Stack
                            onClick={() => handleCheckPermission(permission)}
                            direction="row"
                            spacing={6}
                            sx={{ justifyContent: "space-between", alignItems: "center" }}
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              sx={{ justifyContent: "flex-start", alignItems: "center" }}
                            >
                              <i
                                className="icon-bold-cd"
                                style={{ color: "#007CFE", fontSize: "22px" }}
                              />
                              <Typography
                                variant="p"
                                sx={{ fontSize: "20px", color: "#2E3236", fontWeight: 600 }}
                              >
                                {permission.name}
                              </Typography>
                            </Stack>
                            <Checkbox
                              value={permission._id}
                              onChange={() => handleCheckPermission(permission)}
                              checked={findIdInArray(permissions, permission._id)}
                            />
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 2, mt: 1 }}>
          <Button
            onClick={() => {
              onClose(permissions);
              handleClose();
            }}
            disabled={areArraysEqualById(permissionsCurrent, permissions)}
            variant="contained"
            size="large"
            sx={{ background: "#007CFE", width: "30%" }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddPermissionToPosition;
