import React, { useState, useEffect, memo } from 'react';
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';
import { LocaleProvider } from 'antd-mobile'
// import { en_US } from 'antd-mobile-languages'
// const [lang, setLang] = React.useState(en_US)
import dayjs from 'dayjs';
import { useHttpHook } from '@/hooks';
import { history } from 'umi';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

function Search(props) {
  console.log('search render')
  const [selectedCity, setSelectedCity] = useState(['10001']);
  const [times, setTimes] = useState('Time');
  const [dateShow, setDateShow] = useState(false);

  const handleCityChange = (value) => {
    // console.log(value);
    setSelectedCity(value);
  };

  const handleDate = () => {
    setDateShow(!dateShow);
  };

  const handleDateConfirm = (startTime, endTime) => {
    // console.log(startTime, endTime);
    setDateShow(!dateShow);
    setTimes(dayjs(startTime).format('YYYY-MM-DD') + '~' + dayjs(endTime).format('YYYY-MM-DD'));
  };

  const handleClick = () => {
    if(times.includes('~')){
      history.push({
        pathname: '/search',
        query: {
          code: selectedCity,
          startTime: times.split('~')[0],
          endTime: times.split('~')[1],
        }
      });
    }else {
      Toast.fail('Please select period');
    }
  };

  useEffect(() => {

  }, [])

  return (
    <div className='search'>
      <LocaleProvider locale={enUS}>
      <div>
          <div className='search-addr'>
            {!props.citysLoading && <Picker
              title='City'
              data={props.citys}
              value={selectedCity}
              cascade={false}
              cols={1}
              onChange={handleCityChange}
            >
              <List.Item>Select City</List.Item>
            </Picker>}
          </div>
          {/**Time list */}
          <div className='search-time' onClick={handleDate}>
            <p className='search-time_left'>Rental Time</p>
            <p className='search-time_right'>{times}</p>
          </div>
          {/**Search Button */}
          <Button type='warning' size='large' onClick={handleClick}>Search House</Button>
          <Calendar
            visible={dateShow}
            onCancel={handleDate}
            onConfirm={handleDateConfirm}
          />
      </div>
      </LocaleProvider>
    </div>
  )
}

function areEqual(prevProps, nextProps){
  // console.log(prevProps, nextProps)
  if(prevProps.citys === nextProps.citys && prevProps.citysLoading === nextProps.citysLoading){
    return true;
  }else {
    return false;
  }
}

export default memo(Search, areEqual);
