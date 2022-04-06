import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { getUserDetails } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      // dispatch(updateUser(name, email, password));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {error && <Message variant={'danger'}>{error}</Message>}
        {message && <Message variant={'danger'}>{message}</Message>}

        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>My Orders</Col>
    </Row>
  );
};

export default ProfileScreen;
