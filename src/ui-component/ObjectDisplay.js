import React from "react";
import _ from "lodash";
import { Box, ButtonBase } from "@mui/material";
import Copy from './Copy'
const keysTrans = {
  _id: 'Mã',
  region: 'Khu vực',
  message: 'Tin nhắn',
  member: 'Thành viên',
  phone: 'SĐT',
  name: 'Tên',
  birthday: 'Năm sinh',
  picture: 'Ảnh',
  id: 'Mã',
  data: 'Dữ liệu',
  amount: 'Số lượng',
  idOrder: 'Mã đơn',
  finalCoints: 'Coints cuối',
  initialCoints: 'Coints đầu',
  initialRealMoneyShop: 'RealMoneyShop đầu',
  finalRealMoneyShop: 'RealMoneyShop cuối',
  initialRealMoney: 'SSM đầu',
  finalRealMoney: 'SSM cuối',
  createdAt: 'Tạo lúc',
  idTransaction: 'Mã giao dịch'
};
const objectDisplay = (data) => {
  let type = typeof data;
  if (_.isArray(data)) {
    type = "array";
  }
  
  switch (type) {
    case "object":
      return (
        <Box pl={2}>
          {Object.keys(data).map((key) => {
            let value = objectDisplay(data[key]);
            return (
              <Box>
                {keysTrans[key] || key}: {value}
              </Box>
            );
          })}
        </Box>
      );
      break;
    case "array":
      return <Box pl={2}>{'['}{data.map((dat) => objectDisplay(dat))}{']'}</Box>
      break;
    case "number":
      return <Box component='span'><Copy text={data}>{data}</Copy></Box>
      break;
    case "string":
      return <Box component='span'><Copy sx={{color: 'orange'}} text={data}>{data}</Copy></Box>
      break;
    default:
      return JSON.stringify(data)
      break;
  }
};

const Display = ({ data }) => {
  return <Box>{objectDisplay(data)}</Box>;
};
export default Display;
