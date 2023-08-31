import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "../api/axios";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

const generos = [
  { label: "masculino", value: "masculino" },
  { label: "femenino", value: "femenino" },
];

export default function ModalEditPersona({ persona }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [personaId, setPersonaId] = useState(persona.id);
  const [nombre, setNombre] = useState(persona.nombre);
  const [apellido, setApellido] = useState(persona.apellido);
  const [dni, setDni] = useState(persona.dni);
  const [genero, setGenero] = useState(persona.genero);
  const [edad, setEdad] = useState(persona.edad);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("false");
  const [cargando, setCargando] = useState('false');

  const changeNombre = (e) => {
    setNombre(e.target.value);
  };

  const changeApellido = (e) => {
    setApellido(e.target.value);
  };

  const changeDni = (e) => {
    setDni(e.target.value);
  };

  const changeEdad = (e) => {
    setEdad(e.target.value);
  };

  const changeGenero = (e) => {
    setGenero(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors([]);
      setCargando('true');
      const response = await axios
        .put("/api/persona/"+personaId, { nombre, apellido, dni, genero, edad })
        .then(function (response) {
          setSuccess("true");
        });
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
    setCargando('false');
  };

  return (
    <>
      <Button onPress={onOpen}>Editar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="dark text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edición
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {success === "true" && (
                    <Chip color="success" variant="shadow">
                      ¡Persona editada!
                    </Chip>
                  )}
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
                  {errors.nombre && (
                    <Chip color="warning" variant="shadow">
                      {errors.nombre}
                    </Chip>
                  )}
                  <Input
                    isRequired
                    label="Apellido"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={changeApellido}
                    placeholder="Ingresa el apellido"
                    type="text"
                  />
                  {errors.apellido && (
                    <Chip color="warning" variant="shadow">
                      {errors.apellido}
                    </Chip>
                  )}
                  <Input
                    isRequired
                    label="DNI"
                    id="dni"
                    name="dni"
                    value={dni}
                    onChange={changeDni}
                    placeholder="Ingresa el dni"
                    type="number"
                  />
                  {errors.dni && (
                    <Chip color="warning" variant="shadow">
                      {errors.dni}
                    </Chip>
                  )}
                  <Input
                    isRequired
                    label="Edad"
                    id="edad"
                    name="edad"
                    value={edad}
                    onChange={changeEdad}
                    placeholder="Ingresa la edad"
                    type="number"
                  />
                  {errors.edad && (
                    <Chip color="warning" variant="shadow">
                      {errors.edad}
                    </Chip>
                  )}
                  <Select
                    items={generos}
                    label="Género"
                    name="genero"
                    id="genero"
                    onChange={changeGenero}
                    placeholder="Seleccione un género"
                    className="max-w-xs"
                    selectedKeys={[genero]}
                  >
                    {(genero) => (
                      <SelectItem key={genero.value}>{genero.label}</SelectItem>
                    )}
                  </Select>
                  {errors.genero && (
                    <Chip color="warning" variant="shadow">
                      {errors.genero}
                    </Chip>
                  )}
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" type="submit"  isDisabled={cargando === 'true'}>
                      Editar
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
