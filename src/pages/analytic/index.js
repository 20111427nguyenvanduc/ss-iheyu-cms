import React from "react";
import { PieChart, Pie, Cell, Legend, LabelList } from "recharts";
import { Typography, Box } from "@mui/material";

// Dữ liệu cho biểu đồ
const data = [
  { name: "Chờ xử lý", value: 5, color: "#007BFF" }, // Màu xanh dương
  { name: "Đang xử lý", value: 1, color: "#00C49F" }, // Màu xanh lá
  { name: "Đã xử lý", value: 2, color: "#4CAF50" }, // Màu xanh lá đậm
];

const COLORS = data.map((item) => item.color);

const CustomDonutChart = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0); // Tổng số phản ánh

  return (
    <Box sx={{ backgroundColor: "#F5F9FF", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
        Kết quả xử lý
      </Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          dataKey="value"
          startAngle={90}
          endAngle={450}
          labelLine={false} // Tắt đường dẫn của nhãn
          label={({ name, value }) => `${value}`} // Hiển thị số liệu trên mỗi Cell
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
          <LabelList
            position="inside"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              fill: "#FFF",
            }}
          />
        </Pie>
        {/* Hiển thị số liệu ở giữa biểu đồ */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "24px", fontWeight: "bold", fill: "#007BFF" }}
        >
          {total}
        </text>
        <text
          x="50%"
          y="50%"
          dy="20"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "14px", fill: "#4A4F55" }}
        >
          Phản ánh
        </text>
      </PieChart>
      {/* Hiển thị chú thích */}
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="middle"
        formatter={(value) => (
          <span style={{ fontSize: "14px", color: "#4A4F55" }}>
            {value}
          </span>
        )}
      />
    </Box>
  );
};

export default CustomDonutChart;
