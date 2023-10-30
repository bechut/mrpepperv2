import React, { useEffect, useState } from 'react';
import { getAppInstance } from '@mrpepper/firebase';
import { Button, Space, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch, actions } from '../../../assets/redux/store';
import { ISample } from '@mrpepper/types';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const Page: React.FC<ISample> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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

  const changeLang = () => {
    console.log(location.pathname);
    const l = location.pathname.slice(0, 3);
    const l1 = l === '/en' ? '/vi' : '/en';
    navigate(location.pathname.replace(l, l1));
  };

  useEffect(() => {
    getAppInstance().then(() => setFirebaseConnected(true));
  }, []);

  return (
    <Space direction="vertical">
      <Typography.Title className="my-0" level={4}>
        {t('sample:title?sample')}
      </Typography.Title>
      <div>Firebase: {firebaseConnected ? ' connected' : ' disconnected'}</div>
      <div>
        Antd:{' '}
        <Button onClick={onClick} type="primary">
          Click
        </Button>
      </div>
      <div>
        {t('sample:label?languages')}:{' '}
        <Button onClick={changeLang} type="primary">
          {t('sample:button-label?change_lang')}
        </Button>
      </div>
    </Space>
  );
};

export default Page;
