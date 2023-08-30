import axios from "../api/axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect} from "react";
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
  Button
} from "@nextui-org/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Acciones", uid: "acciones" },
];

export default function TableCategorias() {
  const [categorias, setCategorias] = useState([]);

  const getCategorias = async () => {
    const res = await axios.get("/api/categoria");
    setCategorias(res.data.data);
    console.log(categorias)
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    const categoriaId = user.id;
    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">{cellValue}</p>
          </div>
        );
      case "acciones":
        return (
          <div className="relative flex items-center justify-center gap-2">
              <Button href={"/editar/"+categoriaId}>Editar</Button> 
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
        <TableBody items={categorias}>
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
