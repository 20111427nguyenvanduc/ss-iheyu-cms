import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { list as listUnit } from "../../services/unit";
import { list as listPosition } from "../../services/position";
import _ from "lodash";

const RecursiveSelectDynamic = ({ unit, position, setUnit, setPosition }) => {
  const [departments, setDepartments] = useState([]); // Danh sách các cấp
  const [selectedDepartments, setSelectedDepartments] = useState([]); // Lựa chọn hiện tại
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [listDataPosition, setListDataPosition] = useState([]); // Danh sách vị trí của phòng ban được chọn

  useEffect(() => {
    getParentCurrent();
  }, []);

  useEffect(() => {
    if (unit) {
      getListPosition(unit);
    } else {
      setListDataPosition([]);
    }
  }, [unit]);

  const getParentCurrent = () => {
    setLoading(true);
    listUnit({})
      .then((res) => {
        if (_.get(res, "code") === 200) {
          const data = _.get(res, "data", []);
          setDepartments([data]); // Khởi tạo danh sách cấp đầu tiên
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách cấp gốc:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const getListPosition = (unitId) => {
    listPosition({ unit: unitId })
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

  const handleLocationChange = (value) => {
    setPosition(value); // Lưu vị trí được chọn
  };

  const renderSelects = () =>
    departments.map((departmentList, level) => (
      <Box key={level} mt={2} display="flex" alignItems="center">
        <Select
          value={selectedDepartments[level] || ""}
          onChange={(e) => handleSelectChange(e.target.value, level)}
          displayEmpty
          sx={{ width: "300px" }}
        >
          <MenuItem value="" disabled>
            Chọn phòng ban
          </MenuItem>
          {departmentList.map((department) => (
            <MenuItem key={_.get(department, "_id")} value={_.get(department, "_id")}>
              {_.get(department, "name", "Chưa rõ")}
            </MenuItem>
          ))}
        </Select>
        {selectedDepartments[level] && (
          <IconButton
            onClick={() => fetchChildDepartments(selectedDepartments[level], level)}
            sx={{ ml: 2 }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Box>
    ));

  const renderLocationSelect = () => (
    <Box mt={2}>
      <Typography variant="h6">Chọn vị trí:</Typography>
      <Select
        value={position || ""}
        onChange={(e) => handleLocationChange(e.target.value)}
        displayEmpty
        sx={{ width: "300px" }}
      >
        <MenuItem value="" disabled>
          Chọn vị trí
        </MenuItem>
        {listDataPosition.map((position) => (
          <MenuItem key={_.get(position, "_id")} value={_.get(position, "_id")}>
            {_.get(position, "name", "Chưa rõ")}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );

  return (
    <Box display="flex" gap={4}>
      <Box flex={1}>
        <Typography variant="h6">Chọn phòng ban</Typography>
        {renderSelects()}
        {loading && (
          <Box mt={2}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
      <Box flex={1}>
        {listDataPosition.length > 0 && renderLocationSelect()}
      </Box>
    </Box>
  );
};

export default RecursiveSelectDynamic;
