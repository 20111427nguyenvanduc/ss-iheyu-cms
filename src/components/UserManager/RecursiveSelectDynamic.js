import React, { useState, useEffect, Fragment } from "react";
import { Box, Typography, CircularProgress, Button, Grid, Avatar, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Autocomplete } from "@mui/material";
import { list as listUnit } from "../../services/unit";
import { list as listPosition } from "../../services/position";
import _ from "lodash";
import async from "async";
import LoadingButton from "@mui/lab/LoadingButton";

const StyledButtonImg = styled(Avatar)({
  backgroundColor: "transparent",
  cursor: "pointer",
  position: "absolute",
  right: "-32px",
});

const Vector = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "12px",
  height: "44px",
  top: "-16px",
  left: "-12px",
  borderRadius: "0px 0px 0px 4px",
  borderLeft: "1px solid #CCCFD3",
  borderBottom: "1px solid #CCCFD3",
}));

const StyledButtonAdd = styled(LoadingButton)({
  background: "#E5F1FF",
  borderRadius: "12px",
  textTransform: "inherit",
  color: "#007CFE",
  "&:hover": {
    backgroundColor: "#E5F1FF",
    color: "#007CFE",
  },
});

const RecursiveSelectDynamic = ({
  unit,
  position,
  setUnit,
  setPosition,
  handleUpdatePermissionsAndGroups,
  GridItemProps,
  GridProps,
  ...props
}) => {
  const [departments, setDepartments] = useState([]); // Danh sách các cấp
  const [selectedDepartments, setSelectedDepartments] = useState([]); // Lựa chọn hiện tại
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải dữ liệu
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [listDataPosition, setListDataPosition] = useState([]); // Danh sách vị trí của phòng ban được chọn

  useEffect(() => {
    getParentCurrent(unit);
  }, []);

  useEffect(() => {
    if (unit) {
      getListPosition(unit);
    } else {
      setListDataPosition([]);
    }
  }, [unit]);

  const getParentCurrent = (firstUnit) => {
    const newSelectedDepartments = _.get(firstUnit, "parentPath", []).concat(firstUnit);
    const newDepartments = [];
    const initDepartment = _.isEmpty(firstUnit) ? [{}] : newSelectedDepartments;
    async.waterfall(
      initDepartment.map((unitSelected) => (next) => {
        listUnit({ parent: _.get(unitSelected, "_id") })
          .then((res) => {
            if (_.get(res, "code") === 200) {
              const data = _.get(res, "data", []);
              newDepartments.push(data); // Thêm vào danh sách
            }
          })
          .catch((error) => {
            console.error("Lỗi khi tải danh sách cấp gốc:", error);
          })
          .finally(() => {
            next();
          });
      }),
      (err) => {
        setDepartments(newDepartments);
        setSelectedDepartments(newSelectedDepartments);
        setIsLoading(true);
      }
    );
  };

  const fetchChildDepartments = (parentId, levelIndex) => {
    setLoading(true);
    listUnit({ parent: parentId })
      .then((res) => {
        if (_.get(res, "code") === 200) {
          const childDepartments = _.get(res, "data", []);
          if (childDepartments.length) {
            setDepartments((prev) => [...prev.slice(0, levelIndex + 1), childDepartments]);
          } else {
            setDepartments((prev) => [...prev.slice(0, levelIndex + 1)]);
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách con:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getListPosition = (unitObj) => {
    listPosition({ unit: _.get(unitObj, "_id") })
      .then((res) => {
        if (_.get(res, "code") === 200) {
          const data = _.get(res, "data", []);
          setListDataPosition(data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách vị trí:", error);
      });
  };

  const handleSelectChange = (value, levelIndex) => {
    const newSelectedDepartments = [...selectedDepartments];
    newSelectedDepartments[levelIndex] = value;

    // Xóa các cấp dưới nếu người dùng thay đổi lựa chọn
    newSelectedDepartments.splice(levelIndex + 1);
    setSelectedDepartments(newSelectedDepartments);

    // Cập nhật phòng ban cuối cùng
    setUnit(value);
  };

  const handlePositionChange = (value) => {
    const newPermissions = _.get(value, "permissions", []);
    const newGroupPermissions = _.get(value, "groupPermissions", []);
    setPosition(value); // Cập nhật chức vụ
    handleUpdatePermissionsAndGroups(newPermissions, newGroupPermissions);
  };

  const handleDelete = (levelIndex) => {
    // Xóa danh sách cấp hiện tại và quay lại bước trước đó
    setDepartments((prev) => [...prev.slice(0, levelIndex)]);
    setSelectedDepartments((prev) => [...prev.slice(0, levelIndex)]);
  };

  const renderSelects = () =>
    departments.map((departmentList, level) => (
      <Box
        key={level}
        mb={2}
        display="flex"
        alignItems="center"
        position="relative"
        ml={1.5 * level}
      >
        {level ? <Vector /> : null}
        <Autocomplete
          options={departmentList}
          getOptionLabel={(option) => _.get(option, "name", "Chưa rõ")}
          value={_.get(selectedDepartments, `[${level}]`, null)}
          onChange={(e, value) => handleSelectChange(value, level)}
          noOptionsText="Không có dữ liệu"
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Chọn đơn vị trực thuộc" variant="outlined" />
          )}
        />
        {/* Nút Xóa: Hiển thị ở `Autocomplete` cuối cùng, nhưng không phải ở cấp đầu tiên */}
        {level > 0 && level === _.get(departments, "length", 0) - 1 && (
          <StyledButtonImg onClick={() => handleDelete(level)}>
            <i className="icon-bold-close-circle" style={{ color: "#656C75" }} />
          </StyledButtonImg>
        )}
      </Box>
    ));

  const renderAddButton = () => {
    const isLastSelectedValid =
      _.get(selectedDepartments, "length", 0) > 0 &&
      _.get(selectedDepartments[selectedDepartments.length - 1], "_id", "");

    return (
      isLastSelectedValid && (
        <Box mb={2} ml={departments.length * 1.5} sx={{ position: "relative", width: "100%" }}>
          <Vector sx={{ height: "38px" }} />
          <StyledButtonAdd
            onClick={() =>
              fetchChildDepartments(
                _.get(selectedDepartments[selectedDepartments.length - 1], "_id", ""),
                _.get(selectedDepartments, "length", 0) - 1
              )
            }
            variant="contained"
            size="large"
            disabled={loading}
            loading={loading}
            startIcon={<i className="icon-bold-add-circle" style={{ color: "#007CFE" }} />}
          >
            Thêm đơn vị trực thuộc
          </StyledButtonAdd>
        </Box>
      )
    );
  };

  const renderLocationSelect = () => (
    <Box>
      <Autocomplete
        options={listDataPosition}
        getOptionLabel={(option) => _.get(option, "name", "Chưa rõ")}
        value={position || null}
        onChange={(e, value) => handlePositionChange(value)}
        noOptionsText="Không có dữ liệu"
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Chọn chức vụ" variant="outlined" />
        )}
      />
    </Box>
  );

  return isLoading ? (
    <Grid container columnSpacing={4} mt={1} {...GridProps}>
      <Grid item xs={6} {...GridItemProps}>
        <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 400, mb: 1 }}>
          Đơn vị
        </Typography>
        {renderSelects()}
        {renderAddButton()}
      </Grid>
      <Grid item xs={6} {...GridItemProps}>
        <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 400, mb: 1 }}>
          Chức vụ
        </Typography>
        {renderLocationSelect()}
      </Grid>
    </Grid>
  ) : null;
};

export default RecursiveSelectDynamic;
