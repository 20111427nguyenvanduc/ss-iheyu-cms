import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
 boxShadow: "none",
 borderRadius: '16px',
 border: `1px solid #CCCFD3`,
}))

const StyledTable = styled(Table)(({ theme }) => ({
 boxShadow: "none",
 wordWrap: "break-word",
 tableLayout: "auto",
 borderCollapse: "collapse",
 borderStyle: "hidden",
 "& td": {
  border: `1px solid #CCCFD3`,
 },
 "& th": {
  border: `1px solid #CCCFD3`,
 },
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
 fontSize: "16px",
 [`&.${tableCellClasses.head}`]: {
  backgroundColor: theme.palette.background.tableHead,
  // color: theme.palette.common.black,
  // border: `1px solid #CCCFD3`,
  padding: theme.spacing(2),
  fontWeight: 700,
  color: "#143250",
 },
 [`&.${tableCellClasses.body}`]: {
  // fontSize: '14px',
  // backgroundColor: theme.palette.common.white,
  // color: theme.palette.common.black,
  // border: `1px solid #CCCFD3`,
  padding: theme.spacing(1.5),
  verticalAlign: "top",
  fontWeight: 400,
  alignContent: "center",
 },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
 "&:nth-of-type(odd)": {
  // backgroundColor: theme.palette.action.hover,
 },
}))

export default function CustomizedTables({ heads = [], rows = [], tableContainerProps }) {
 const theme = useTheme()
 return (
  <StyledTableContainer {...tableContainerProps}>
   <StyledTable>
    <TableHead>
     <TableRow>
      {heads.map((head, i) => (
       <StyledTableCell key={"head" + i} {...head.props}>
        {head.children}
       </StyledTableCell>
      ))}
     </TableRow>
    </TableHead>
    <TableBody>
     {rows.length ? (
      rows.map((row, i) => (
       <StyledTableRow key={"row" + i} {...row.props}>
        {row.cells &&
         row.cells.map((cell, j) => (
          <StyledTableCell key={cell.key || "row" + i + "cell" + j} {...cell.props}>
           {cell.children}
          </StyledTableCell>
         ))}
       </StyledTableRow>
      ))
     ) : (
      <StyledTableRow>
       <StyledTableCell colSpan={heads.length}>
        <Box p={2} display='flex' justifyContent='center'>
         <Typography>
          <span className='icon-bold-emoji-sad'></span> Không có dữ liệu
         </Typography>
        </Box>
       </StyledTableCell>
      </StyledTableRow>
     )}
    </TableBody>
   </StyledTable>
  </StyledTableContainer>
 )
}

export const createCell = (children, props = { align: "center" }) => ({
 props,
 children,
})

export const createRows = (cells = [], props = {}) => ({
 props,
 cells: cells.map((cell) => createCell(cell, props)),
})
