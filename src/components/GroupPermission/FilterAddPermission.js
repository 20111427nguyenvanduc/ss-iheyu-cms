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
  Stack,
} from "@mui/material";
import { list as listGroupPermission } from "../../services/groupPermission";
import { list as listPermission } from "../../services/permission";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog";
import AddGroupToPosition from "./AddGroupToPosition";
import AddPermissionToPosition from "./AddPermissionToPosition";
import Search from "../Shared/Search";

const FilterAddPermission = ({
  permissions = [],
  setPermissions,
  groupPermissions = [],
  setGroupPermissions,
}) => {
  const [dataGroup, setDataGroup] = useState([]);
  const [dataPermission, setDataPermission] = useState([]);
  const [textSearchGroup, setTextSearchGroup] = useState("");
  const [textSearchPermission, setTextSearchPermission] = useState("");

  useEffect(() => {
    getListGroupPermissions();
    getListPermissions();
  }, []);

  const getListGroupPermissions = () => {
    let excepts = groupPermissions.map((item) => item._id);
    listGroupPermission({ name: textSearchGroup, excepts }).then((res) => {
      if (_.get(res, "code") === 200) {
        setDataGroup(_.get(res, "data"));
      }
    });
  };

  const getListPermissions = () => {
    let excepts = groupPermissions.map((item) => item._id);
    listPermission({ name: textSearchPermission, excepts }).then((res) => {
      if (_.get(res, "code") === 200) {
        setDataPermission(_.get(res, "data"));
      }
    });
  };

  const confirmAddGroup = (data) => {
    const merged = [...groupPermissions, ...data];
    const uniqueById = merged.reduce((acc, current) => {
      if (!acc.some((item) => item._id === current._id)) {
        acc.push(current);
      }
      return acc;
    }, []);

    setGroupPermissions(uniqueById); // Cập nhật state
  };

  const confirmAddPermission = (data) => {
    const merged = [...permissions, ...data];
    const uniqueById = merged.reduce((acc, current) => {
      if (!acc.some((item) => item._id === current._id)) {
        acc.push(current);
      }
      return acc;
    }, []);
    setPermissions(uniqueById); // Cập nhật state
  };

  const handleDeleteGroup = (idToDelete) => {
    setGroupPermissions((prevItems) => prevItems.filter((item) => item._id !== idToDelete));
  };

  const handleDeletePermission = (idToDelete) => {
    setPermissions((prevItems) => prevItems.filter((item) => item._id !== idToDelete));
  };

  // Lọc quyền danh sách dựa trên nội dung tìm kiếm
  const filteredPermissions = permissions.filter((per) =>
    per.name.toLowerCase().includes(textSearchPermission.toLowerCase())
  );

  // Lọc nhóm quyền danh sách dựa trên nội dung tìm kiếm
  const filteredGroupPermissions = groupPermissions.filter((per) =>
    per.name.toLowerCase().includes(textSearchGroup.toLowerCase())
  );

  return (
    <Box
      sx={{
        border: "1px solid #CCCFD3",
        borderRadius: "12px",
        width: "100%",
        background: "#F6F5FC",
      }}
      p={2}
    >
      <Typography variant="p" sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
        Danh sách quyền
      </Typography>
      <Grid
        item
        xs={12}
        mt={2}
        sx={{
          background: "#FFF",
          border: "1px solid #A1A7AE",
          borderRadius: "12px",
          height: "450px",
        }}
        p={2}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "center", width: "100%" }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-start", alignItems: "center" }}
          >
            <Typography variant="p" sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
              Nhóm quyền
            </Typography>
            <AddGroupToPosition
              groupPermissionsCurrent={groupPermissions}
              onClose={confirmAddGroup}
              dataGroup={dataGroup}
              textSearch={textSearchGroup}
              setTextSearch={setTextSearchGroup}
              onSubmitSearch={getListGroupPermissions}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "#E5F1FF",
                  borderRadius: "12px",
                  textTransform: "inherit",
                  color: "#007CFE",
                  "&:hover": {
                    backgroundColor: "#E5F1FF",
                    color: "#007CFE",
                  },
                }}
                startIcon={<i className="icon-bold-add-circle" style={{ color: "#007CFE" }} />}
              >
                Thêm nhóm quyền
              </Button>
            </AddGroupToPosition>
          </Stack>
          <Search
            placeholder={"Tìm nhóm quyền"}
            textSearch={textSearchGroup}
            searchChange={(text) => {
              setTextSearchGroup(text);
            }}
            onSubmit={() => {}}
          />
        </Stack>

        <Grid container spacing={2} mt={1}>
          {filteredGroupPermissions.map((group, i) => {
            return (
              <Grid item key={i}>
                <Box display={"flex"} flexDirection="column" gap={1.5} mt={1}>
                  <Accordion
                    sx={{
                      border: "1px solid #CCCFD3",

                      boxShadow: "none",
                      borderRadius: "12px !important",
                    }}
                  >
                    <AccordionSummary
                      id={i}
                      //  expandIcon={<i className='icon-linear-arrow-down' style={{color: "#292D32", fontSize: "20px"}} />}
                      sx={{
                        px: 2,
                        margin: 0,
                        "&.Mui-expanded .MuiAccordionSummary-content": {
                          margin: "0",
                        },
                        "&.Mui-expanded": {
                          minHeight: "48px",
                        },
                      }}
                    >
                      <Stack
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
                            className="icon-bold-task-square"
                            style={{ color: "#007CFE", fontSize: "22px" }}
                          />
                          <Typography
                            variant="p"
                            sx={{ fontSize: "20px", color: "#2E3236", fontWeight: 600 }}
                          >
                            {group.name}
                          </Typography>
                          <i
                            className="icon-linear-arrow-down"
                            style={{ color: "#292D32", fontSize: "22px" }}
                          />
                        </Stack>
                        <AlertDialogDelete
                          title="Thông báo"
                          description={"Bạn muốn xóa nhóm quyền " + group.name + "?"}
                          onClose={() => {}}
                          onHandle={() => {
                            handleDeleteGroup(group._id);
                          }}
                        >
                          <i
                            className="icon-bold-minus-cirlce"
                            style={{ color: "#D30500", fontSize: "22px" }}
                          />
                        </AlertDialogDelete>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 0, borderTop: "1px solid #CCCFD3" }}>
                      <Box display={"flex"} flexDirection="column" gap={1.5} mt={1} px={2}>
                        {[1, 2, 3, 4, 5].map((group, i) => {
                          return (
                            <Stack
                              key={i}
                              direction="row"
                              spacing={2}
                              sx={{ justifyContent: "flex-start", alignItems: "center", gap: 2 }}
                            >
                              <i className="icon-bold-cd" style={{ color: "#656C75" }} />
                              Sửa {group}
                              <Typography
                                component="p"
                                sx={{ fontSize: "16px", color: "#010810" }}
                              ></Typography>
                            </Stack>
                          );
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        mt={2}
        sx={{
          background: "#FFF",
          border: "1px solid #A1A7AE",
          borderRadius: "12px",
          height: "450px",
        }}
        p={2}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "center", width: "100%" }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-start", alignItems: "center" }}
          >
            <Typography variant="p" sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
              Các quyền thêm{" "}
            </Typography>

            <AddPermissionToPosition
              permissionsCurrent={permissions}
              onClose={confirmAddPermission}
              dataPermission={dataPermission}
              textSearch={textSearchPermission}
              setTextSearch={setTextSearchPermission}
              onSubmitSearch={getListPermissions}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "#E5F1FF",
                  borderRadius: "12px",
                  textTransform: "inherit",
                  color: "#007CFE",
                  "&:hover": {
                    backgroundColor: "#E5F1FF",
                    color: "#007CFE",
                  },
                }}
                startIcon={<i className="icon-bold-add-circle" style={{ color: "#007CFE" }} />}
              >
                Thêm quyền
              </Button>
            </AddPermissionToPosition>
          </Stack>
          <Search
            placeholder={"Tìm quyền"}
            textSearch={textSearchPermission}
            searchChange={(text) => {
              setTextSearchPermission(text);
            }}
            onSubmit={() => {}}
          />
        </Stack>

        <Grid container spacing={2} mt={1}>
          {filteredPermissions.map((per, i) => {
            return (
              <Grid item key={i}>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  gap={1.5}
                  mt={1}
                  sx={{ border: "1px solid #CCCFD3", padding: "12px 16px", borderRadius: "12px" }}
                >
                  <Stack
                    direction="row"
                    spacing={6}
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ justifyContent: "flex-start", alignItems: "center" }}
                    >
                      <i className="icon-bold-cd" style={{ color: "#007CFE", fontSize: "22px" }} />
                      <Typography
                        variant="p"
                        sx={{ fontSize: "20px", color: "#2E3236", fontWeight: 600 }}
                      >
                        {per.name}
                      </Typography>
                    </Stack>
                    <AlertDialogDelete
                      title="Thông báo"
                      description={"Bạn muốn xóa quyền ?"}
                      onClose={() => {}}
                      onHandle={() => {
                        handleDeletePermission(per._id);
                      }}
                    >
                      <i
                        className="icon-bold-minus-cirlce"
                        style={{ color: "#D30500", fontSize: "22px" }}
                      />
                    </AlertDialogDelete>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterAddPermission;
