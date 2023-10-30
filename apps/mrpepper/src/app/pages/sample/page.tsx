import React, { useEffect, useState } from 'react';
import { getAppInstance } from '@mrpepper/firebase';
import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch, actions } from '../../../assets/redux/store';
import { ISample } from '@mrpepper/types';

const Page: React.FC<ISample> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [firebaseConnected, setFirebaseConnected] = useState<boolean>(false);

  const onClick = () => {
    dispatch(
      actions.appSlice.setAlert({
        message: 'Testing redux app message',
        status: true,
        show: true,
      })
    );
  };

  useEffect(() => {
    getAppInstance().then(() => setFirebaseConnected(true));
  }, []);

  return (
    <Space direction="vertical">
      <div>Firebase: {firebaseConnected ? ' connected' : ' disconnected'}</div>
      <div>
        Antd:{' '}
        <Button onClick={onClick} type="primary">
          Click
        </Button>
      </div>
    </Space>
  );
};

export default Page;
