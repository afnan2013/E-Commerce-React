import React from 'react';
import { Nav } from 'react-bootstrap';

const CheckoutSteps = () => {
  return (
    <>
      <Nav>
        <Nav.Link>Shipping</Nav.Link>
        <Nav.Link>Payment</Nav.Link>
        <Nav.Link>Shipping</Nav.Link>
        <Nav.Link>Shipping</Nav.Link>
      </Nav>
    </>
  );
};

export default CheckoutSteps;
