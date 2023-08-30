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

export default function FormAsign() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('false');

  const [personaId, setPersonaId] = useState('');
  const [cursoId, setCursoId] = useState('');

  const changePersonaId = (e)=>{
    setPersonaId(e.target.value);
  }

  const changeCursoId = (e)=>{
    setCursoId(e.target.value);
  }

  const [personas, setPersonas] = useState([]);

  const [cursos, setCursos] = useState([]);

  const cargarPersonas =  ()=>{
    const response = axios.get('/api/persona').then(function (response) {
        setPersonas(response.data.data);
    });

  }
  

  const cargarCursos = ()=>{
    const response = axios.get('/api/curso').then(function (response) {
        setCursos(response.data.data);
    });
  }

  useEffect(()=>{
    cargarPersonas();
    cargarCursos();
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(personaId, cursoId);
    try {
        setErrors([]);
        const response = await axios.post('/api/asign', {persona_id: personaId, curso_id: cursoId}).then(function(response){
            setSuccess('true');
        });
    } catch (e) {
        console.log(e);
        if(e.response.status === 422){
            setErrors(e.response.data.errors);
        }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {success === 'true' && <Chip color="success" variant="shadow">¡Persona anotada!</Chip>}
      <Select
        items={personas}
        label="Personas"
        name="personaId"
        id="personaId"
        onChange={changePersonaId}
        placeholder="Seleccione una persona"
        className="max-w-xs"
      >
        {(persona) => <SelectItem key={persona.id}>{persona.nombre+', '+persona.apellido}</SelectItem>}
      </Select>

      <Select
        items={cursos}
        label="Cursos"
        name="cursoId"
        id="cursoId"
        onChange={changeCursoId}
        placeholder="Seleccione un curso"
        className="max-w-xs"
      >
        {(curso) => <SelectItem key={curso.id}>{curso.nombre+', '+curso.categoria.nombre}</SelectItem>}
      </Select>
      {errors.general && <Chip color="warning" variant="shadow">{errors.general}</Chip>}
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Asignar Persona a Curso
        </Button>
      </div>
    </form>
  );
}
