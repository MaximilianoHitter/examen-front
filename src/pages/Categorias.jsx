import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TableCategorias from "../components/TableCategorias";
export default function Categorias() {
    return (
      <div className="flex justify-center mt-5">
        <div className="flex flex-col">
          <Tabs aria-label="Options">
            <Tab key="table" title="Tabla" className="">  
                <TableCategorias/>
            </Tab>
            <Tab key="form" title="Crear" className="max-w-5xl">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="inscribit" title="Inscribir" className="max-w-3xl">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }