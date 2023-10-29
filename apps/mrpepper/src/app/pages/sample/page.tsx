import React from 'react';
import { app } from '@mrpepper/firebase';
import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch, actions } from '../../../assets/redux/store';

const Page: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onClick = () => {
    dispatch(
      actions.appSlice.setAlert({
        message: 'Testing redux app message',
        status: true,
        show: true,
      })
    );
  };

  return (
    <Space direction="vertical">
      <div>Firebase: {app ? ' connected' : ' disconnected'}</div>
      <div>
        Antd: <Button onClick={onClick} type="primary">Click</Button>
      </div>
    </Space>
  );
};

export default Page;
