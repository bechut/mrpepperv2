import { FC, lazy, useEffect } from 'react';
import { Button, Card, Form, Space, Typography } from 'antd';
import { ILoginProps, ILoginPayload } from '@mrpepper/types';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { appDispatch, rootState } from '../../assets/redux';
import { loginAsync } from './fetch';

const EmailInput = lazy(() => import('../../components/form/email-input'));
const PasswordInput = lazy(
  () => import('../../components/form/password-input')
);

const Page: FC<ILoginProps> = (props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const authStates = useSelector(
    (states: rootState) => states.authSlice,
    shallowEqual
  );
  const dispatch = useDispatch<appDispatch>();
  const navigate = useNavigate();

  const onLogin = (values: ILoginPayload) => {
    dispatch(loginAsync(values));
  };

  useEffect(() => {
    if (authStates.success) {
      navigate(`/${props.locale}/login`);
    }
  }, [authStates.success]);

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
        <Typography.Title level={2}>
          {t('login:form-title?log_in')}
        </Typography.Title>
        <Form
          name="basic"
          onFinish={onLogin}
          labelAlign="left"
          labelCol={{ xs: 24 }}
          form={form}
        >
          <EmailInput
            label={t('sign-up:form-label?email')}
            placeholder=""
            msg={{
              error: {
                required: t('sign-up:form-err-msg?email_required'),
                invalid: t('sign-up:form-err-msg?email_invalid'),
              },
            }}
          />

          <PasswordInput
            label={t('sign-up:form-label?password')}
            placeholder=""
            msg={{
              error: {
                required: t('sign-up:form-err-msg?password_required'),
                len: t('sign-up:form-err-msg?password_len_8'),
              },
            }}
          />

          <Button loading={authStates.loading} htmlType="submit" type="primary">
            {t('login:form-button?log_in')}
          </Button>
        </Form>
        <Space direction="vertical" style={{ margin: '8px 0' }}>
          <Link to={`/${props.locale}/signup`}>
            <Button
              loading={authStates.loading}
              htmlType="button"
              type="link"
              icon={<ArrowLeftOutlined />}
            >
              {t('sign-up:button-label?sign_up')}
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default Page;
