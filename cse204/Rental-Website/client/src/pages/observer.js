import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { useObserverHook } from '@/hooks';

let observer;
export default function(props){
  const [state, setState] = useState()

  useObserverHook('#loading', (entries)=>{
    console.log(entries)
  });

  const handleClick = () => {
    history.push('/');
  };


  return (
    <div>
      observer
      <button onClick={handleClick}>Main Page</button>
      <div id='loading' style={{width:'100px',height:'100px',background:'#f60', marginTop:'1000px'}}>
        loading
      </div>
    </div>
  )
}