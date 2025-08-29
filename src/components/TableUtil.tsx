import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { TableUtilProps } from "@/types/employee";
import { konkhmer } from "../utils/helpers";

const TableUtil = <T extends { id: string | number }>({
  data,
  columns,
  onClick,
  expand,
  isLoading = false,
}: TableUtilProps<T> & { isLoading?: boolean }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const displayData = expand ? data : data.slice(0, 5);

  // Responsive sizes
  const headerFontSize = isMobile ? "8px" : "10px";
  const cellFontSize = isMobile ? "6px" : "10px";
  const iconSize = isMobile ? "16px" : "20px";
  const iconPadding = isMobile ? 4 : 8;

  return (
    <Paper style={{ boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)" }}>
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
                  fontSize: headerFontSize,
                  fontFamily: konkhmer.style.fontFamily,
                }}
                align={column.align || "left"}
              >
                {column.header}
              </TableCell>
            ))}
            <TableCell
              style={{ 
                color: "white", 
                paddingTop: 4, 
                paddingBottom: 4, 
                margin: 0,
                width: isMobile ? "40px" : "50px",
                minWidth: isMobile ? "40px" : "50px"
              }}
              align="center"
            >
              <IconButton
                size={isMobile ? "small" : "medium"}
                style={{
                  color: "white",
                  padding: iconPadding,
                  margin: 0,
                  minWidth: "auto",
                }}
                onClick={onClick}
              >
                {expand ? 
                  <RemoveIcon style={{ fontSize: iconSize }} /> : 
                  <AddIcon style={{ fontSize: iconSize }} />
                }
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <div
        style={{
          maxHeight: expand ? 248 : 263,
          overflowY: expand ? "auto" : "visible",
          minHeight: 200,
        }}
      >
        <Table sx={{ minWidth: 200 }}>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  style={{ textAlign: "center", height: 200 }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : displayData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  style={{ textAlign: "center", height: 200 }}
                >
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No hay datos disponibles
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.accessorKey)}
                      align={column.align || "left"}
                      style={{
                        paddingLeft: isMobile ? 4 : 10,
                        paddingRight: isMobile ? 4 : 10,
                        paddingTop: 0,
                        paddingBottom: 0,
                        height: isMobile ? 40 : 52,
                        maxWidth: isMobile ? "80px" : "300px",
                        fontFamily: konkhmer.style.fontFamily,
                        fontSize: cellFontSize,
                        wordBreak: "break-word",
                      }}
                    >
                      {column.cell
                        ? column.cell(row)
                        : String(row[column.accessorKey])}
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default TableUtil;
