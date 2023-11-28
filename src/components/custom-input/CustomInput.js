import React from "react";
import { Form } from "react-bootstrap";
export const CustomInput = ({ label, passRef, ...rest }) => {
  return (
    <Form.Group classname="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} />
    </Form.Group>
  );
};
