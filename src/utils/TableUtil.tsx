import {
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
import { konkhmer } from "./helpers";

const TableUtil = <T extends { id: string | number }>({
  data,
  columns,
  onClick,
  expand,
}: TableUtilProps<T>) => {
  const displayData = expand ? data : data.slice(0, 5);

  return (
    <Paper style={{ border: "2px solid black" }}>
      <Table sx={{ minWidth: 200 }} aria-label="reusable table">
        <TableHead
          style={{
            backgroundColor: "#480935",
          }}
        >
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.accessorKey)}
                style={{
                  color: "white",
                  fontSize: "10px",
                  fontFamily: konkhmer.style.fontFamily,
                }}
                align={column.align || "left"}
              >
                {column.header}
              </TableCell>
            ))}
            <TableCell
              style={{ color: "white", padding: 0, margin: 0 }}
              align="right"
            >
              <IconButton
                style={{
                  color: "white",
                  fontSize: "0px",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 0,
                  paddingBottom: 0,
                  margin: 0,
                }}
                onClick={onClick}
              >
                {expand ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <div
        style={{
          maxHeight: expand ? 248 : 263,
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
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 0,
                      paddingBottom: 0,
                      height: 50,
                      width: 300,
                      fontFamily: konkhmer.style.fontFamily,
                      fontSize: "12px",
                    }}
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
