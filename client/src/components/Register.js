import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerInitiate } from '../store/actions/userActions';
import 'antd/dist/antd.css';

const Register = () => {
  const [registerValues, setRegisterValues] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <div>
      <Form
      validateMessages={validateMessages}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
          <Form.Item
          getValueFromEvent={(e) => {setRegisterValues({...registerValues, fullname: e.target.value})}}
          label="Full Name"
          name="fullname"
        >
          <Input />
        </Form.Item>
        <Form.Item
          getValueFromEvent={(e) => {setRegisterValues({...registerValues, email: e.target.value})}}
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item
        getValueFromEvent={(e) => {setRegisterValues({...registerValues, password: e.target.value})}}
        name="password"
        label="Password"
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
      getValueFromEvent={(e) => {setRegisterValues({...registerValues, confirmPassword: e.target.value})}}
        name="confirmpassword"
        label="Confirm Password"
      >
        <Input.Password />
      </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button onClick={async () => {
            if(registerValues.password.length === 0 || registerValues.confirmPassword.length === 0) {
              message.error('Password cannot be empty');
            } else if (registerValues.confirmPassword !== registerValues.password) {
              message.error('Passwords not match');
            } else {
              await dispatch(registerInitiate(registerValues));
              navigate('/login');
            }
            
           }}
            type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register