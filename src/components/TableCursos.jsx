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
  { name: "Descripcion", uid: "descripcion" },
  { name: "Categoría", uid: "categoria" },
  { name: "Acciones", uid: "acciones" },
];

export default function TableCursos() {
  const [cursos, setCursos] = useState([]);

  const getCursos = async () => {
    const res = await axios.get("/api/curso");
    setCursos(res.data.data);
    console.log(cursos)
  };

  useEffect(() => {
    getCursos();
  }, []);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    const categoria = user.categoria;
    const cursoId = user.id;
    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "descripcion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "categoria":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{categoria.nombre}</p>
          </div>
        );
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
              <Button href={"/editar/"+cursoId}>Editar</Button> 
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" className="w-full">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
        <TableBody items={cursos}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
    </Table>
  );
}
