import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "../api/axios";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./StyleSlider.css";

// import required modules
import { Navigation } from "swiper/modules";

export default function Slider() {
  const [cursos, setCursos] = useState([]);

  const getCursos = () => {
    const res = axios.get("/api/cursos-actualizados").then(function (response) {
      setCursos(response.data.data);
    });
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper bg-black">
      {cursos.map((curso) => (
        <SwiperSlide key={curso.id} virtualIndex={curso.id}>
            <Card className="w-full h-[200px]">
                <CardHeader className="px-20 flex-col text-center">{curso.nombre}</CardHeader>
                <CardBody className="text-center">
                <p>Descripcion: {curso.descripcion}</p>
                <p>Categoria: {curso.categoria.nombre}</p>
                </CardBody>
                <CardFooter className="bg-black/40 h-[50px] border-default-600 dark:border-default-100">
                    {curso.updated_at != null && <p className="text-center">Actualizado: {curso.actualizado}</p>}
                </CardFooter>
            </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
