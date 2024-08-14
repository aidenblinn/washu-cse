import React, { useState, useEffect } from 'react';
import {
  List, ImagePicker, Toast, InputItem, Button
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';

function Edit(props) {
  
  const { getFieldProps, validateFields } = props.form;
  const { user: { editUserAsync, getUserAsync, avatar, phone, sign } } = useStoreHook();
  const [files, setFiles] = useState([{url: avatar}]);

  const handleChange = (files) => {
    if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
      Toast.fail('The size of the picture should be less than 0.5M');
      return;
    }
    setFiles(files);
  };

  const handleSubmit = () => {
    if(!files.length){
      Toast.fail('Please upload a picture');
      return;
    }
    validateFields((error, value)=>{
      if(error){
        Toast.fail('Please fill up the information');
        return;
      }else {
        editUserAsync({
          avatar: files[0].url,
          phone: value.tel,
          sign: value.sign
        });
      }
    });
  };

  useEffect(() => {
    getUserAsync({});
  }, [])

  return (
    <div className='user-edit'>
      <List>
          <ImagePicker
            files={files}
            selectable={files.length < 1}
            onChange={handleChange}
          />
          <InputItem
            {...getFieldProps('tel', {
              rules: [{ required: true }],
              initialValue: phone
            })}
            placeholder='Phone Number'
          >
            Phone：
          </InputItem>
          <InputItem
            {...getFieldProps('sign', {
              rules: [{ required: true }],
              initialValue: sign
            })}
            placeholder='Sign'
          >
            Sign：
          </InputItem>
      </List>
      <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>Modify</Button>
    </div>
  )
}

export default createForm()(Edit);