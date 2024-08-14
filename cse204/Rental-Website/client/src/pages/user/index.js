import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd-mobile';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const { user: { username, avatar, phone, sign, getUserAsync, logoutAsync } } = useStoreHook();
  const [state, setState] = useState()

  const handleClick = () => {
    history.push({
      pathname: '/user/edit',
      query: {
        id: 10
      }
    });
  };

  const handleLogout = () => {
    logoutAsync();
  };

  useEffect(() => {
    getUserAsync({
      id: 10
    });
  }, [])

  return (
    <ErrorBoundary>
    <div className='user-page'>
      {/**User Information */}
      <div className='info'>
        <div className='set' onClick={handleClick}>Settings</div>
        <div className='user'>
          <img alt='user' src={avatar || require('../../assets/yay.jpg')} />
          <div className='tel'>{phone}</div>
          <div className='sign'>{sign}</div>
        </div>
      </div>
      <Button style={{marginTop:'100px'}} onClick={handleLogout}>Logout</Button>
    </div>
    </ErrorBoundary>
  )
}