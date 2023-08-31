import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TableCategorias from "../components/TableCategorias";
import FormCreateCategoria from "../components/FormCreateCategoria";
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
                  <FormCreateCategoria/>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }