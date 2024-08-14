import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { useLocation } from 'umi';
import { ShowLoading } from '@/components';
import { CommonEnum } from '@/enums';
import { history } from 'umi';

import './index.less';

export default function (props) {
  const { query } = useLocation();
  const [houseName, setHouseName] = useState('');
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [houseLists, setHouseLists] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [houseSubmitName, setHouseSubmitName] = useState('');

  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59'
    },
    watch: [page.pageNum, houseSubmitName]
  });

  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    if (!loading && entries[0].isIntersecting) {
      setPage({
        ...page,
        pageNum: page.pageNum + 1
      });
    }

  }, null);

  useImgHook('.item-img', (enties)=>{}, null);

  const handleChange = (value) => {
    setHouseName(value);
  };

  const _handleSubmit = (value) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setPage(CommonEnum.PAGE);
    setHouseLists([]);
  };

  const handleCancle = () => {
    _handleSubmit('');
  };

  const handleSubmit = (value) => {
    _handleSubmit(value);
  };

  useEffect(() => {
    console.log(loading, houses, "===>")
    if (!loading && houses) {
      if(houses.length){
        setHouseLists([...houseLists, ...houses]);
        if(houses.length < page.pageSize){
          setShowLoading(false);
        }
      }else {
        setShowLoading(false);
        setHouseLists([]);
      }
    }
  }, [loading])

  return (
    <div className='search-page'>
      {/**Top */}
      <SearchBar
        placeholder='Search house'
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancle}
        onSubmit={handleSubmit}
      />
      {/**Result */}
      <div className='result'>
        {houseLists.map(item => (
          <div className='item' key={item.id} onClick={() => history.push({
            pathname: '/house',
            query: {
              id: item.id,
            }
          })}>
            <img alt='img' className='item-img' src={require('../../assets/blank.png')} data-src={item ?.imgs[0] ?.url} />
            <div className='item-right'>
              <div className='title'>{item.name}</div>
              <div className='price'>{item.price}</div>
            </div>
          </div>
        ))}
        <ShowLoading showLoading={showLoading} />
      </div>
    </div>
  )
}
