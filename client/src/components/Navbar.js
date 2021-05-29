import React from "react";
import { PageHeader, Image } from "antd";
import "../css/Navbar.css";
import logo from "../assets/logo512.png";

const Navbar = () => {
  return (
    <nav>
      <PageHeader className="site-page-header">
        <Image src={logo} height={50} width={50}/>
      </PageHeader>
    </nav>
  );
};

export default Navbar;
