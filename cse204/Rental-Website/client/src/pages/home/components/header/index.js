import React, { useState, useEffect, memo } from 'react';
import { Link } from 'umi';
import { cookie } from 'project-libs';

function Header(props) {
  const [username, setState] = useState(localStorage.getItem('username'))
  console.log('header render')

  useEffect(() => {
  }, [])

  return (
    <div className='header'>
      <div className='header_title'>House</div>
      <div className='header_login'>
      {username ? username : <><Link to='/login'>Login</Link> | <Link to='/register'>Register</Link></>}
      </div>
    </div>
  )
}

export default memo(Header);