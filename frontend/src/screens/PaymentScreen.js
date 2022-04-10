import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Form, Col } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(address);
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">
            <strong>Select Method</strong>
          </Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              value="Bkash"
              label="Bkash"
              name="paymentMethod"
              id="Bkash"
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled
            ></Form.Check>
            <Form.Check
              type="radio"
              value="Stripe"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
