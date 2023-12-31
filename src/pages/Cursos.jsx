import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import FormCreateCurso from "../components/FormCreateCurso";
import TableCursos from "../components/TableCursos";
import TableReporte from "../components/TableReporte";
import Custom from "../components/Custom";
export default function Cursos() {
    return (
      <div className="flex justify-center mt-5">
        <div className="flex flex-col">
          <Tabs aria-label="Options">
          <Tab key="filter" title="Cursos" className="">
              <Card>
                <CardBody>
                  <Custom/>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="form" title="Crear" className="max-w-5xl">
              <Card>
                <CardBody>
                 <FormCreateCurso/>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="reporte" title="Reporte" className="max-w-3xl">
              <Card>
                <CardBody>
                  <TableReporte/>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }