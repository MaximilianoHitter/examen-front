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

export default function ModalEditCategoria({ categoria }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [categoriaId, setCategoriaId] = useState(categoria.id);
  const [nombre, setNombre] = useState(categoria.nombre);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("false");
  const [cargando, setCargando] = useState("false");

  const changeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors([]);
      setCargando("true");
      const response = await axios
        .put("/api/categoria/" + categoriaId, { nombre })
        .then(function (response) {
          setSuccess("true");
        });
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
    setCargando("false");
  };

  return (
    <>
      <Button onPress={onOpen}>Editar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="dark text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edición</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {success === "true" && (
                    <Chip color="success" variant="shadow">
                      ¡Categoria Editada!
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
                  <div className="flex gap-2 justify-end">
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      isDisabled={cargando === "true"}
                    >
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
