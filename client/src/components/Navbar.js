import React from "react";
import { PageHeader } from "antd";
import "../css/Navbar.css";
import logo from "../assets/logo512.png";

const Navbar = () => {
  return (
    <div>
      <PageHeader className="site-page-header">
        <img
          src={logo}
          height={60}
          style={{ margin: "0 12px 0 0", float: "left" }}
        />
      </PageHeader>
    </div>
  );
};

export default Navbar;
