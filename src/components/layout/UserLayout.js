import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Col, Container, Row } from "react-bootstrap";

import { Sidebar } from "../../sidebar/Sidebar";
export const UserLayout = ({ children, title }) => {
  return (
    <div className="d-flex  min-vh-100">
      <div className="side-menu bg-info text-light">
        <Sidebar />
      </div>

      <div className="right-content w-100">
        <Header />

        <div className="p-3">
          <h3>{title}</h3>
          <hr />
        </div>

        {/* main */}

        <main className="main p-3"> {children}</main>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};
