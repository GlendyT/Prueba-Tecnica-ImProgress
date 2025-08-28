import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
} from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { TableUtilProps } from "@/types/employee";

const TableUtil = <T extends { id: string | number }>({
  data,
  columns,
  onClick,
  expand,
}: TableUtilProps<T>) => {
  const displayData = expand ? data : data.slice(0, 5);

  return (
    <Paper>
      <Table sx={{ minWidth: 200 }} aria-label="reusable table">
        <TableHead
          style={{
            backgroundColor: "#480935",
            padding: 0,
            margin: 0,
          }}
        >
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.accessorKey)}
                style={{ color: "white", fontSize: "12px" }}
                align={column.align || "left"}
              >
                {column.header}
              </TableCell>
            ))}
            <TableCell style={{ color: "white" }} align="center">
              <IconButton style={{ color: "white" }} onClick={onClick}>
                {expand ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <div
        style={{
          maxHeight: expand ? 300 : "auto",
          overflowY: expand ? "auto" : "visible",
        }}
      >
        <Table sx={{ minWidth: 200 }}>
          <TableBody>
            {displayData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.accessorKey)}
                    align={column.align || "left"}
                  >
                    {column.cell
                      ? column.cell(row)
                      : String(row[column.accessorKey])}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default TableUtil;
