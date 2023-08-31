import Slider from "../components/Slider"
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function Home(){
    return(
        <div className="flex justify-center mt-5">
        <div className="flex flex-col">
          <Tabs aria-label="Options">
            <Tab key="table" title="Cursos" className="w-[600px]">
              <Card>
                <CardBody>
                  <Slider/>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
}