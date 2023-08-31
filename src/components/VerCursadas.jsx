import axios from "../api/axios";
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
import { Select, SelectItem } from "@nextui-org/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "Nombre", uid: "nombre" },
  { name: "Descripcion", uid: "descripcion" },
  { name: "Categoría", uid: "categoria" },
];

export default function VerCursadas() {
  const [cursos, setCursos] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [persona, setPersona] = useState('');

  const changePersona = (e) => {
    const selectedPersona = e.target.value;
    setPersona(selectedPersona);
  }

  const getPersonas = async () => {
    const res = await axios.get('/api/persona');
    setPersonas(res.data.data);
  }

  const getCursos = () => {
    const res = axios.post("/api/cursosPorPersona", {persona_id:persona}).then((response)=>{
      setCursos(response.data.data);
    });
  };

  useEffect(()=>{
    if(persona){
      getCursos();
    }
  }, [persona])

  useEffect(() => {
    getPersonas();
  }, []);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    const categoria = user.categoria;
    const cursoId = user.id;
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
      case "categoria":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-center">
              {categoria.nombre}
            </p>
          </div>
        );
      
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <Select
        items={personas}
        label="Personas"
        name="personas"
        id="personas"
        onChange={changePersona}
        placeholder="Seleccione una persona"
        className="max-w-xs"
      >
        {(persona) => (
          <SelectItem key={persona.id}>{`${persona.nombre}, ${persona.apellido}`}</SelectItem>
        )}
      </Select>

      <Table aria-label="Example table with custom cells" className="w-full">
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
                <TableCell align="center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
