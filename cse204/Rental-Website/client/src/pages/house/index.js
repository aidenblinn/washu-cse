import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import Footer from './components/Footer';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';

import './index.less';

export default function (props) {
  const { house: { detail, getDetailAsync, getCommentsAsync, comments, reloadComments, reloadCommentsNum, showLoading, resetData, order, hasOrderAsync, addOrderAsync, delOrderAsync } } = useStoreHook();
  const { query } = useLocation();

  const handleBtnClick = (id) => {
    if(!id){
      addOrderAsync({
        id: query?.id
      });
    }else {
      delOrderAsync({
        id: query?.id
      });
    }
  }

  useObserverHook('#'+CommonEnum.LOADING_ID, (entries) => {
    if(comments && comments.length && showLoading && entries[0].isIntersecting){
      reloadComments();
    }
  }, [comments, showLoading]);

  useEffect(() => {
    getDetailAsync({
      id: query?.id
    });
  }, [])

  useEffect(()=>{
    getCommentsAsync({
      id: query?.id
    });
  }, [reloadCommentsNum])

  useEffect(()=>{
    hasOrderAsync({
      id: query?.id
    });
  }, [])

  useEffect(()=>{
    return () => {
      resetData({
        detail: {}
      });
    }
  }, [])

  return (
    <div className='house-page'>
      {/**banner */}
      <Banner banner={detail?.banner} />
      {/**house list */}
      <Info detail={detail?.info} order={order} btnClick={handleBtnClick} />
      {/**Comment list */}
      <Lists lists={comments} showLoading={showLoading}/>
      <Footer />
    </div>
  )
}