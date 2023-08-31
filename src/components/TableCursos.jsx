import axios from "../api/axios";
import { Link } from "react-router-dom";
import ModalEditCurso from "./ModalEditCurso";
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
  { name: "Actualizado", uid:"updated_at"},
  { name: "Creado", uid:"created_at"},
  { name: "Acciones", uid: "acciones" },
];

export default function TableCursos() {
  const [cursos, setCursos] = useState([]);
  const [sortDescriptor, setSortDescriptor] = React.useState({});
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const getCursos = async () => {
    const res = await axios.get("/api/curso");
    setCursos(res.data.data);
  };

  useEffect(() => {
    getCursos();
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...cursos];

    /* if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    } */
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [cursos, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    
    return filteredItems.slice();
  }, [filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    const categoria = user.categoria;
    const cursoId = user.id;
    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">{cellValue}</p>
          </div>
        );
      case "descripcion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">{cellValue}</p>
          </div>
        );
      case "categoria":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">{categoria.nombre}</p>
          </div>
        );
        case "updated_at":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">{cellValue}</p>
          </div>
        );
        case "created_at":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">{cellValue}</p>
          </div>
        );
      case "acciones":
        return (
          <div className="relative flex items-center justify-center gap-2">
              <ModalEditCurso curso={user} categoria={categoria}/>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells"
     className="w-[1000px]"  
     sortDescriptor={sortDescriptor}
     onSortChange={setSortDescriptor}>
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
        <TableBody items={cursos}>
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
