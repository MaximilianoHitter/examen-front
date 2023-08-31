import axios from "../api/axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
} from "@nextui-org/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Descripcion", uid: "descripcion" },
  { name: "Masculino", uid: "porcentaje_masculino" },
  { name: "Femenino", uid: "porcentaje_femenino" },
  { name: "Mayores", uid: "porcentaje_mayores" },
  { name: "Menores", uid: "porcentaje_menores" },
];

export default function TableReporte() {
  const [reporte, setReporte] = useState([]);

  const getReporte = async () => {
    const res = await axios.get("/api/reportePorCurso");
    setReporte(res.data.data);
  };

  useEffect(() => {
    getReporte();
  }, []);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">
              {cellValue}
            </p>
          </div>
        );
      case "descripcion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">
              {cellValue}
            </p>
          </div>
        );
      case "porcentaje_masculino":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">
              {'%'+cellValue}
            </p>
          </div>
        );
      case "porcentaje_femenino":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">
              {'%'+cellValue}
            </p>
          </div>
        );
      case "porcentaje_mayores":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">
              {'%'+cellValue}
            </p>
          </div>
        );
      case "porcentaje_menores":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">
              {'%'+cellValue}
            </p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" className="w-[600px]">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={"center"}
            className="text-center"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={reporte}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell align="center">{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
