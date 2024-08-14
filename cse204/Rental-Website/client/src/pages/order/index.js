import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import Lists from './components/Lists';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { Http } from '@/utils';
import { isEmpty } from 'project-libs';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [orders, setOrders] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [type, setType] = useState(0);

  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/orders/lists',
      body: {
        ...page,
        pageNum,
        type
      }
    });
    return result;
  };

  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum);
    if (!isEmpty(result) && result.length <= page.pageSize) {
      setOrders(result);
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  };

  const handleChange = (e) => {
    setType(e.sub);
    setPage(CommonEnum.PAGE);
    setOrders([]);
    setShowLoading(true);
  };

  const tabs = [
    { title: 'Unpaid orders', sub: 0 },
    { title: 'Paid orders', sub: 1 }
  ];


  useObserverHook('#' + CommonEnum.LOADING_ID, async (entries) => {
    console.log(entries)
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.pageNum + 1);
      if (!isEmpty(orders) && !isEmpty(result) && result.length === page.pageSize) {
        setOrders([...orders, ...result]);
        setPage({
          ...page,
          pageNum: page.pageNum + 1
        });
        setShowLoading(true);
      } else {
        setShowLoading(false);
      }
    }
  }, null);

  useEffect(() => {
    fetchOrder(1);
  }, [type])

  return (
    <ErrorBoundary>
      <div className='order-page'>
        <Tabs
          tabs={tabs}
          onChange={handleChange}
        >
          <div className='tab'>
            <Lists orders={orders} type={0} showLoading={showLoading} />
          </div>
          <div className='tab'>
            <Lists orders={orders} type={1} showLoading={showLoading} />
          </div>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}