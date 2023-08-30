import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import {Chip} from "@nextui-org/react";

export default function FormCreateCurso() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('false');
  const [cargando, setCargando] = useState('false');

  const [categorias, setCategorias] = useState([]);

  const changeNombre = (e)=>{
    setNombre(e.target.value);
  }

  const changeDescripcion = (e)=>{
    setDescripcion(e.target.value);
  }

  const changeCategoriaId = (e)=>{
    setCategoriaId(e.target.value);
  }

  const cargarCategorias = ()=>{
    const res = axios.get('/api/categoria').then(function(response){
        setCategorias(response.data.data);
    })
  }

  useEffect(()=>{
    cargarCategorias();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setErrors([]);
        setCargando('true');
        const response = await axios.post('/api/curso', {nombre, descripcion, categoria_id: categoriaId}).then(function(response){
            setSuccess('true');
        });
    } catch (e) {
        if(e.response.status === 422){
            setErrors(e.response.data.errors);
        }
    }
    setCargando('false');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {success === 'true' && <Chip color="success" variant="shadow">¡Curso creado!</Chip>}
      <Input
        isRequired
        label="Nombre"
        id="nombre"
        name="nombre"
        value={nombre}
        onChange={changeNombre}
        placeholder="Ingresa el nombre"
        type="text"
      />
      {errors.nombre && <Chip color="warning" variant="shadow">{errors.nombre}</Chip>}
      <Input
        isRequired
        label="Descripción"
        id="descripcion"
        name="descripcion"
        value={descripcion}
        onChange={changeDescripcion}
        placeholder="Ingresa una descripcion"
        type="text"
      />
      {errors.descripcion && <Chip color="warning" variant="shadow">{errors.descripcion}</Chip>}
      <Select
        items={categorias}
        label="Categoría"
        name="categoria"
        id="categoria"
        onChange={changeCategoriaId}
        placeholder="Seleccione una categoría"
        className="max-w-xs"
      >
        {(categoria) => <SelectItem key={categoria.id}>{categoria.nombre}</SelectItem>}
      </Select>
      {errors.categoria_id && <Chip color="warning" variant="shadow">{errors.categoria_id}</Chip>}
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isDisabled={cargando === 'true'}>
          Crear
        </Button>
      </div>
    </form>
  );
}
