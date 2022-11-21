import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginInitiate } from '../store/actions/userActions';

const Login = () => {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Form
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
          getValueFromEvent={(e) => {setLoginValues({...loginValues, email: e.target.value})}}
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item
        getValueFromEvent={(e) => {setLoginValues({...loginValues, password: e.target.value})}}
        name="password"
        label="Password"
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
            await dispatch(loginInitiate(loginValues))
            if(localStorage.getItem('user')) {
              navigate('/');
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

export default Login