import React from "react";
import { Link, Outlet } from "react-router-dom";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";

export default function CustomNavBar() {
  return (
    <>

    <Navbar isBordered>
      <NavbarBrand>
        <Link to="/">
            <p className="font-bold text-inherit">Examen Maximiliano Hitter</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className=" sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/personas">
            Personas
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/cursos">
            Cursos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/categorias">
            Categorías
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <Outlet/>
    </>
  );
}
