import TablePersonas from "../components/TablePersonas";
import FormCreatePersona from "../components/FormCreatePersona";
import FormAsign from "../components/FormAsign";
import VerCursadas from "../components/VerCursadas";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
export default function Personas() {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col">
        <Tabs aria-label="Options">
          <Tab key="table" title="Tabla"className="w-full">
            <Card>
              <CardBody>
                <TablePersonas />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="form" title="Crear" className="">
            <Card>
              <CardBody>
                <FormCreatePersona/>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="inscribit" title="Inscribir" className="">
            <Card>
              <CardBody>
                <FormAsign/>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="verinscripciones" title="Ver inscripciones" className="">
            <Card>
              <CardBody>
                <VerCursadas/>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
