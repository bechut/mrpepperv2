import React, { useEffect } from 'react';
import {
  AppDispatch,
  RootState,
  actions,
  thunks,
} from '../../../assets/redux/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ISignUpPayload, ISignUpProps } from '@mrpepper/types';

let clickCount = 0;

const Page: React.FC<ISignUpProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authStates = useSelector(
    (states: RootState) => states.authSlice,
    shallowEqual
  );
  const onSignup = (values: ISignUpPayload) => {
    dispatch(thunks.auth.signup(values));
    clickCount = 1;
  };

  useEffect(() => {
    if (!authStates.loading && clickCount > 0) {
      form.resetFields();
      clickCount = 0;
    }

    if (authStates.success && clickCount > 0) {
      form.resetFields();
      clickCount = 0;

      setTimeout(() => {
        navigate(`/en/login`);
        dispatch(actions.authSlice.reset());
      }, 3000);
    }
  }, [authStates, form, navigate, dispatch]);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Card
        style={{
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <h2>{t('sign-up:form-title?sign_up')}</h2>
        <Form
          name="basic"
          onFinish={onSignup}
          labelAlign="left"
          labelCol={{ xs: 24 }}
          form={form}
        >
          <Form.Item
            name="email"
            label={t('sign-up:form-label?email')}
            rules={[
              { required: true, message: t('sign-up:error-msg?email_empty') },
              {
                type: 'email',
                message: t('sign-up:error-msg?email_invalid_format'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label={t('sign-up:form-label?username')}
            rules={[
              {
                required: true,
                message: t('sign-up:error-msg?username_empty'),
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('sign-up:form-label?password')}
            rules={[
              {
                required: true,
                message: 'Password is required',
              },
              {
                min: 8,
                message: t('sign-up:error-msg?password_length_8_characters'),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button loading={authStates.loading} htmlType="submit" type="primary">
            {t('sign-up:form-button?sign_up')}
          </Button>
        </Form>
        <Space direction="vertical" style={{ margin: '8px 0' }}>
          <Link to={`/en/login`}>
            <Button
              loading={authStates.loading}
              htmlType="button"
              type="link"
              icon={<ArrowLeftOutlined />}
            >
              {t('log-in:form-button?log_in')}
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default Page;
