import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

import './index.less';

function Login(props) {
  const { user: { registerAsync } } = useStoreHook();

  const { getFieldProps, validateFields } = props.form;

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('Please enter the full messages');
        return;
      } else {
        if (value.password !== value.password2) {
          Toast.fail('Passwords must be the same');
          return;
        }
        registerAsync(value);
      }
    });
  };

  const handleClick = () => {
    history.push('/login');
  };

  useEffect(() => {

  }, [])

  return (
    <div className='register-page'>
      <List
        renderHeader={() => 'User Register'}
      >
        <InputItem
          {...getFieldProps('username', {
            rules: [{ required: true }]
          })}
          placeholder='Username'
        >
          Username：
          </InputItem>
        <InputItem
          type = "password"
          {...getFieldProps('password', {
            rules: [{ required: true }]
          })}
          placeholder='Password'
        >
          Password：
          </InputItem>
        <InputItem
          type = "password"
          {...getFieldProps('password2', {
            rules: [{ required: true }]
          })}
          placeholder='Enter password again'
        >
          Ensure：
          </InputItem>
      </List>
      <Button type='warning' onClick={handleSubmit}>Register</Button>
      <div className='login' onClick={handleClick}>Already have an account, go to login</div>
    </div>
  )
}

export default createForm()(Login);