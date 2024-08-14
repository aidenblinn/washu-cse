import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const [state, setState] = useState()

  const [citys, citysLoading] = useHttpHook({
    url: '/commons/citys'
  });
  const [houses] = useHttpHook({
    url: '/house/hot'
  });

  useEffect(() => {

  }, [])

  return (
    <ErrorBoundary>
      <div className='home'>
        <Header />
        {citys && <Search citys={citys} citysLoading={citysLoading} />}
        {houses && <Hot houses={houses} />}
      </div>
    </ErrorBoundary>
  )
}