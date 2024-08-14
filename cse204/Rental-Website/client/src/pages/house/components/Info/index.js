import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { timer } from '@/utils';

export default function(props){
  const [state, setState] = useState()

  const handleOrder = (id) => {
    props?.btnClick(id)
  }

  const renderBtn = () => {
    // order don't exist
    if(!props.order?.id){
      return <Button className='info-btn' type='warning' onClick={()=>handleOrder()}>Book</Button>
    }

    // Order is unpaid
    if(props.order?.isPayed === 0){
      return <Button className='info-btn' type='ghost' onClick={()=>handleOrder(props.order.id)}>Cancel book</Button>
    }

    // Order is paid
    if(props.order?.isPayed === 1){
      return <Button className='info-btn' type='ghost'>Not available</Button>
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className='info'>
      <div className='info-title'>{props?.detail?.name}</div>
      <div className='info-msg'>Introduction：{props?.detail?.info}</div>
      <div className='info-price'>Price：{props?.detail?.price}</div>
      <div className='info-time'>Publish Time：{timer(props?.detail?.publishTime)}</div>
      <div className='info-time'>Start Time：{timer(props?.detail?.startTime, '')}</div>
      <div className='info-time'>End Time：{timer(props?.detail?.endTime, '')}</div>
      {renderBtn()}
    </div>
  )
}