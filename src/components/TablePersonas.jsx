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
  { name: "Apellido", uid: "apellido" },
  { name: "DNI", uid: "dni" },
  { name: "Género", uid: "genero" },
  { name: "Edad", uid: "edad" },
  { name: "Acciones", uid: "acciones" },
];

export default function TablePersonas() {
  const [personas, setPersonas] = useState([]);

  const getPersonas = () => {
    const res = axios.get("/api/persona").then(function (response) {
      setPersonas(response.data.data);
  });
  };

  useEffect(() => {
    getPersonas();
  }, []);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    const personaId = user.id;
    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "apellido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "dni":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "genero":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "edad":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
              <Button href={"/editar/"+personaId}>Editar</Button> 
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
        <TableBody items={personas}>
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
