import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

import './index.less';

function Login(props) {
  const { user: { loginAsync } } = useStoreHook();

  const { getFieldProps, validateFields } = props.form;

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('Please enter the full message');
        return;
      } else {
        loginAsync(value);
      }
    });
  };

  const handleClick = () => {
    history.push('/register');
  };

  useEffect(() => {

  }, [])

  return (
    <div className='login-page'>
      <List
        renderHeader={() => 'User Login'}
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
          type="password"
          {...getFieldProps('password', {
            rules: [{ required: true }]
          })}
          placeholder='Password'
        >
          Password：
          </InputItem>
      </List>
      <Button type='warning' onClick={handleSubmit}>Login</Button>
      <div className='register' onClick={handleClick}>Not a user, please register first</div>
    </div>
  )
}

export default createForm()(Login);
