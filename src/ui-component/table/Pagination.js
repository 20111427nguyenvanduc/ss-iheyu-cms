import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { styled, useTheme } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  bacground: "#007CFE",
}));

export default function PaginationControlled(props) {
  return <StyledPagination {...props} />;
}
